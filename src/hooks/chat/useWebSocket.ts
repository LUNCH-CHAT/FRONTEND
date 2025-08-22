import { Client, type IFrame, type IMessage } from '@stomp/stompjs';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { ChatMessage } from '../../types/chat';
import { getExp, patchSignUp } from '../../api/refresh';

export const webSocketStatus = {
  CONNECTING: 'CONNECTING',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  RECONNECTING: 'RECONNECTING',
} as const;

export type WebSocketStatus = (typeof webSocketStatus)[keyof typeof webSocketStatus];

export const useWebSocket = (roomId: number) => {
  const [status, setStatus] = useState<WebSocketStatus>('CONNECTING');
  // stomp 연결 후 생성한 client 관리
  const wsClientRef = useRef<Client | null>(null);
  // 수신 채팅 관리
  const [lastMessages, setLastMessages] = useState<ChatMessage[]>([]);

  const queryClient = useQueryClient();

  // 웹소켓 연결
  const connectWebSocket = () => {
    if (wsClientRef.current?.connected) {
      console.log('websocket already connected');
      return;
    }

    setStatus('CONNECTING');

    let token = localStorage.getItem('accessToken');

    const refreshAccessToken = async () => {
      try {
        const { result } = await patchSignUp(); // 토큰 갱신 API 호출
        if (!result?.accessToken) {
          throw new Error('No access token returned');
        }
        return result.accessToken;
      } catch (err) {
        console.error('Token refresh failed:', err);
        return null;
      }
    };

    if (token) {
      const exp = getExp(token);
      // 토큰이 만료되었거나 1분 이내 만료 시 재발급
      if (!exp || exp * 1000 - 60000 < Date.now()) {
        console.log('Access token is expired or expiring soon, refreshing for WebSocket...');
        const newAccessToken = refreshAccessToken();
        if (newAccessToken) {
          localStorage.setItem('accessToken', String(newAccessToken)); // 갱신된 토큰 저장
          token = localStorage.getItem('accessToken');
        } else {
          console.error('Failed to refresh token for WebSocket. Connection aborted.');
          setStatus('CLOSED');
          return; // 토큰 갱신 실패 시 연결 중단
        }
      }
    }

    if (!token) {
      console.error('No valid access token for WebSocket connection.');
      return;
    }

    // stomp 클라이언트 객체 생성
    const client = new Client({
      webSocketFactory: () => new WebSocket(import.meta.env.VITE_WS_URL),
      // 헤더에 토큰 전달
      connectHeaders: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      reconnectDelay: 5000, // 자동 재연결 시도 간격

      // 웹소켓 연결 성공 시
      onConnect: (frame: IFrame) => {
        console.log('websocket connected', frame);
        setStatus('OPEN');

        // 채팅방 구독 및 메시지 수신
        client.subscribe(`/sub/rooms/${roomId}`, (message: IMessage) => {
          const recievedMessage = JSON.parse(message.body);
          setLastMessages(prev => [
            ...prev,
            {
              id: recievedMessage.id,
              roomId: recievedMessage.roomId,
              senderId: recievedMessage.senderId,
              content: recievedMessage.content,
              createdAt: recievedMessage.createdAt,
            },
          ]);

          queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
        });
      },

      // 웹소켓 연결이 끊어졌을 시
      onWebSocketClose: close => {
        console.warn('websocket closed, reconnect trying...', close);
        setStatus('CLOSED');
      },

      // 웹소켓 오류 발생 시
      onWebSocketError: error => {
        console.error('websocket error', error);
        setStatus('RECONNECTING');
      },

      // stomp 프로토콜 오류 발생 시
      onStompError: frame => {
        console.error('STOMP error: ' + frame.headers['message']);
        console.error('Additional details: ' + frame.body);
        setStatus('RECONNECTING');
      },
    });
    wsClientRef.current = client;
    client.activate(); // Client 활성화
  };

  // 메시지 전송
  const sendMessage = ({ roomId, message }: { roomId: number; message: string }) => {
    const client = wsClientRef.current;
    if (client && client.connected) {
      client.publish({
        destination: `/pub/chat/${roomId}`,
        body: JSON.stringify({
          content: message,
        }),
      });

      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
    }
  };

  // 웹소켓 연결 해제
  const disconnectWebSocket = () => {
    console.log('websocket closed');
    setStatus('CLOSED');

    if (wsClientRef.current) {
      wsClientRef.current.deactivate();
      wsClientRef.current = null;
    }
  };

  useEffect(() => {
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]); // roomId가 변경될 때마다 재연결

  useEffect(() => {
    setLastMessages([]); // 소켓 연결 직후 초기화
  }, [roomId]);

  return { status, lastMessages, sendMessage };
};
