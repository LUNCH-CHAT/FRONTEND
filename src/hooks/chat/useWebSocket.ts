import { Client, type IFrame, type IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useEffect, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export const webSocketStatus = {
  CONNECTING: 'CONNECTING',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  RECONNECTING: 'RECONNECTING',
} as const;

export type WebSocketStatus = (typeof webSocketStatus)[keyof typeof webSocketStatus];

export interface MessageType {
  senderId: number;
  content: string;
  createdAt: Date | null;
}

export const useWebSocket = (roomId: number) => {
  const [status, setStatus] = useState<WebSocketStatus>('CONNECTING');
  // stomp 연결 후 생성한 client 관리
  const wsClientRef = useRef<Client | null>(null);
  // 수신 채팅 관리
  const [message, setMessage] = useState<MessageType>({
    senderId: 0,
    content: '',
    createdAt: null,
  });

  const queryClient = useQueryClient();

  // 웹소켓 연결
  const connectWebSocket = () => {
    if (wsClientRef.current?.connected) {
      console.log('websocket already connected');
      return;
    }

    setStatus('CONNECTING');

    // stomp 클라이언트 객체 생성
    const client = new Client({
      webSocketFactory: () => new SockJS(import.meta.env.VITE_WS_URL),
      // 헤더에 토큰 전달
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      },
      reconnectDelay: 5000, // 자동 재연결 시도 간격

      // 웹소켓 연결 성공 시
      onConnect: (frame: IFrame) => {
        console.log('websocket connected', frame);
        setStatus('OPEN');

        // 채팅방 구독 및 메시지 수신
        client.subscribe(`/sub/rooms/${roomId}`, (message: IMessage) => {
          const recievedMessage = JSON.parse(message.body);
          setMessage({
            senderId: recievedMessage.senderId,
            content: recievedMessage.content,
            createdAt: recievedMessage.createdAt,
          });

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
  const sendMessage = (message: string) => {
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

  return { status, message, sendMessage };
};
