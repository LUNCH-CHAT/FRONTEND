import ChattingList from '../../components/ChattingPage/ChattingList';
// import useGetChatRoomList from '../../hooks/chat/useGetChatRoomList';
import { formatDate } from '../../utils/getDate';

const mockData = [
  {
    roomId: 1,
    friendName: '유엠씨',
    department: '컴퓨터공학과',
    lastMessage: '12반에 학관에서 봬요!',
    lastMessageSentAt: '2025-07-30T09:14:57.183Z',
  },
  {
    roomId: 2,
    friendName: '챗터',
    department: '컴퓨터공학과',
    lastMessage: '12반에 학관에서 봬요!',
    lastMessageSentAt: '2025-07-30T09:14:57.183Z',
  },
];

export default function ChattingPage() {
  // userId를 store에서 가져와서 전달
  // const { data: chatRooms = [], isPending, isError } = useGetChatRoomList(userId);

  // 최신 채팅순으로 정렬
  const sortedChatRooms = mockData.sort(
    (a, b) => new Date(b.lastMessageSentAt).getTime() - new Date(a.lastMessageSentAt).getTime()
  );

  // if (isPending) {
  //   // loading spinner
  //   return <div>Loading...</div>;
  // }

  // if (isError) {
  //   return <div>Error</div>;
  // }

  return (
    <>
      <div className="flex flex-col gap-4 select-none">
        {sortedChatRooms?.map(data => {
          const { hours, minutes } = formatDate(data.lastMessageSentAt);

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
              name={data.friendName}
              friendInfo={data.department}
              lastMessage={data.lastMessage}
              time={formattedTime}
              id={data.roomId}
              key={data.roomId}
            />
          );
        })}
      </div>
    </>
  );
}
