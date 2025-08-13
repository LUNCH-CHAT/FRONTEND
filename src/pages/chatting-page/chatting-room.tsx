import { useEffect, useMemo, useRef, useState } from 'react';
import ChatMessages from '../../components/ChattingPage/ChatMessages';
import ChatHeader from '../../components/ChattingPage/ChatHeader';
import ChatInput from '../../components/ChattingPage/ChatInput';
import { useLocation, useParams } from 'react-router-dom';
import useGetChatMessages from '../../hooks/chat/useGetChatMessages';
import { useInView } from 'react-intersection-observer';
import { useWebSocket } from '../../hooks/chat/useWebSocket';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export default function ChattingRoom() {
  // 상대 정보 추출
  const location = useLocation();
  const { name, friendInfo } = location.state;

  // 웹소켓 연결
  const { id: roomId } = useParams();
  const { lastMessages, sendMessage, status } = useWebSocket(Number(roomId));

  const { data, isFetching, hasNextPage, isPending, isError, fetchNextPage } = useGetChatMessages(
    Number(roomId)
  );

  // 채팅 입력창
  const [message, setMessage] = useState('');

  // 스크롤 처리 참조
  const scrollRef = useRef<HTMLDivElement | null>(null);
  // 이전 scrollHeight 저장용 참조
  const previousScrollHeight = useRef<number>(0);

  const { ref: topRef, inView } = useInView({
    threshold: 0,
  });

  // body 영역의 스크롤 없애기
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // 상단 도달 시 과거 메시지 로딩
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      previousScrollHeight.current = scrollRef.current?.scrollHeight ?? 0;
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // 처음 진입 시 맨 아래로 스크롤
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [data?.pages]);

  // 과거 메시지 추가 후 스크롤 위치 보정
  useEffect(() => {
    if (isFetching || !scrollRef.current) return;

    const container = scrollRef.current;
    const newScrollHeight = container.scrollHeight; // 과거 메시지를 불러온 후 전체 스크롤 높이 업데이트
    const diff = newScrollHeight - previousScrollHeight.current;

    container.scrollTop += diff; // 위로 밀려났던 스크롤을 원래 보던 위치로 복원
  }, [data?.pages, isFetching]);

  // 과거 채팅 내역과 새로운 메시지 결합
  const combinedMessages = useMemo(() => {
    // 이전 메세지 서버 최신순 -> 오래된순 변환에 따른 reverse 처리
    const previousMessages = data?.pages.flatMap(page => page.result.data).reverse() ?? [];
    const messages = [...previousMessages, ...lastMessages];

    return messages;
  }, [data?.pages, lastMessages]);

  // 사용자id 추출
  const userId = data?.pages.flatMap(page => page.result.userId)[0]!;
  const friendId = data?.pages.flatMap(page => page.result.friendId)[0]!;

  // 메시지 전송
  const handleSendMessage = () => {
    sendMessage({
      roomId: Number(roomId),
      message,
    });
    setMessage('');

    // 메시지 추가 후 스크롤 위치 보정
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight; // 스크롤 하단으로 이동
    }
  };

  if (isPending) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <ChatHeader id={friendId} name={name} friendInfo={friendInfo} />

      {status !== 'OPEN' ? (
        <p className="flex justify-center pt-7">채팅방 연결중입니다...</p>
      ) : (
        <div ref={scrollRef} className="h-[calc(100dvh-65px-70px)] overflow-y-auto pt-5 pb-5 px-4">
          <div ref={topRef} className="h-1"></div>
          <ChatMessages messages={combinedMessages} senderName={name} userId={userId} />
        </div>
      )}

      <ChatInput value={message} onChange={setMessage} onSubmit={handleSendMessage} />
    </div>
  );
}
