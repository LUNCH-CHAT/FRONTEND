import { useInView } from 'react-intersection-observer';
import ChattingList from '../../components/ChattingPage/ChattingList';
import useGetChatRoomList from '../../hooks/chat/useGetChatRoomList';
import { formatDate } from '../../utils/getDate';
import { useEffect } from 'react';

export default function ChattingPage() {
  const { data, isFetching, hasNextPage, isPending, isError, fetchNextPage } = useGetChatRoomList();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    // loading spinner
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-4 select-none">
        {data?.pages.flatMap(page => {
          const chatRooms = page.result.data;
          // 최신 채팅순으로 재정렬
          const sortedChatRooms = chatRooms.sort(
            (a, b) =>
              new Date(b.lastMessageSentAt).getTime() - new Date(a.lastMessageSentAt).getTime()
          );

          return sortedChatRooms.map(room => {
            // 오전/오후로 시간 필터링
            const { hours, minutes } = formatDate(room.lastMessageSentAt);
            let displayHours = Number(hours);
            let period = '오전';
            if (displayHours >= 12) {
              period = '오후';
              if (displayHours > 12) {
                displayHours = displayHours - 12;
              }
            }
            const formattedTime = `${period} ${displayHours}:${minutes}`;

            return (
              <ChattingList
                name={room.friendName}
                friendInfo={room.department}
                lastMessage={room.lastMessage}
                time={formattedTime}
                id={room.roomId}
                key={room.roomId}
              />
            );
          });
        })}
      </div>
      <div ref={ref}></div>
    </>
  );
}
