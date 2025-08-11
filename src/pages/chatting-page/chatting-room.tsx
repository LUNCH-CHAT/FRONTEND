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

  const { ref: topRef, inView } = useInView({
    threshold: 0,
  });

  // 상단 도달 시 과거 메시지 로딩
  useEffect(() => {
    if (inView && !isFetching && hasNextPage && scrollRef.current) {
      const prevScrollHeight = scrollRef.current.scrollHeight;
      fetchNextPage().then(() => {
        requestAnimationFrame(() => {
          if (scrollRef.current) {
            const newScrollHeight = scrollRef.current.scrollHeight;
            scrollRef.current.scrollTop =
              scrollRef.current.scrollTop + (newScrollHeight - prevScrollHeight);
          }
        });
      });
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scrollBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      console.log(scrollRef.current.scrollTop);
    }
  };

  useEffect(() => {
    requestAnimationFrame(() => scrollBottom());
  }, [data?.pages]);

  // 과거 채팅 내역과 새로운 메시지 결합
  const combinedMessages = useMemo(() => {
    const previousMessages = data?.pages.flatMap(page => page.result.data) ?? [];
    const messages = [...previousMessages, ...lastMessages];

    return messages;
  }, [data?.pages, lastMessages]);

  // 사용자id 추출
  const userId = data?.pages.flatMap(page => page.result.userId)[0]!;

  // 메시지 전송
  const handleSendMessage = () => {
    sendMessage({
      roomId: Number(roomId),
      message,
    });
    setMessage('');
    requestAnimationFrame(() => scrollBottom());
  };

  if (isPending) {
    // loading spinner
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <ChatHeader name={name} friendInfo={friendInfo} />

      {status !== 'OPEN' ? (
        // loading spinner
        <p className="flex justify-center pt-7">채팅방 연결중입니다...</p>
      ) : (
        <>
          <div ref={scrollRef} className="w-full flex flex-col pt-7 pb-5 overflow-y-auto px-4">
            <div ref={topRef} className="h-1"></div>
            <ChatMessages messages={combinedMessages} senderName={name} userId={userId} />
          </div>
        </>
      )}

      <ChatInput value={message} onChange={setMessage} onSubmit={handleSendMessage} />
    </>
  );
}
