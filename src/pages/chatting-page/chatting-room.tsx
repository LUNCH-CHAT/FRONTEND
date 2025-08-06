import { useEffect, useMemo, useRef, useState } from 'react';
import ChatMessages from '../../components/ChattingPage/ChatMessages';
import ChatHeader from '../../components/ChattingPage/ChatHeader';
import ChatInput from '../../components/ChattingPage/ChatInput';
import { useLocation, useParams } from 'react-router-dom';
import useGetChatMessages from '../../hooks/chat/useGetChatMessages';
import { useInView } from 'react-intersection-observer';
import { useWebSocket } from '../../hooks/chat/useWebSocket';

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

  const { ref, inView } = useInView({
    threshold: 0,
  });
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  // 이전 scrollHeight 저장용
  const previousScrollHeight = useRef<number>(0);

  // 상단 도달 시 과거 메시지 로딩
  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      previousScrollHeight.current = scrollContainerRef.current?.scrollHeight ?? 0;
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  // 과거 메시지 추가 후 스크롤 위치 보정
  useEffect(() => {
    if (isFetching || !scrollContainerRef.current) return;

    const container = scrollContainerRef.current;
    const newScrollHeight = container.scrollHeight; // 과거 메시지를 불러온 후 전체 스크롤 높이 업데이트
    const diff = newScrollHeight - previousScrollHeight.current;

    container.scrollTop += diff; // 위로 밀려났던 스크롤을 원래 보던 위치로 복원
  }, [data?.pages.length, isFetching]);

  // 메시지 추가 후 스크롤 위치 보정
  useEffect(() => {
    if (!scrollContainerRef.current) return;

    scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight; // 스크롤 하단으로 이동
  }, [lastMessages]);

  // 처음 진입 시 맨 아래로 스크롤
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [data?.pages]);

  // 과거 채팅 내역과 새로운 메시지 결합
  const combinedMessages = useMemo(() => {
    const previousMessages = data?.pages.flatMap(page => page.result.data) ?? [];
    const messages = [...previousMessages, ...lastMessages];

    return messages;
  }, [data?.pages, lastMessages]);

  if (isPending) {
    // loading spinner
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  // 메시지 전송
  const handleSendMessage = () => {
    sendMessage(Number(roomId), message);
    setMessage('');
  };

  return (
    <>
      <ChatHeader name={name} friendInfo={friendInfo} />

      {status !== 'OPEN' ? (
        <p>채팅방 연결중입니다...</p>
      ) : (
        <>
          <div
            ref={scrollContainerRef}
            className="flex flex-col-reverse overflow-y-auto h-[calc(100vh-120px)] px-4"
          >
            <div ref={ref}></div>
            <ChatMessages messages={combinedMessages} senderName={name} />
          </div>
        </>
      )}

      <ChatInput value={message} onChange={setMessage} onSubmit={handleSendMessage} />
    </>
  );
}
