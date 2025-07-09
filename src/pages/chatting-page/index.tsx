import ChattingList from '../../components/ChattingPage/ChattingList';
import { formatDate } from '../../utils/getDate';

const mockData = [
  {
    id: 1,
    sender: '유엠씨',
    lastMessage: '12반에 학관에서 봬요!',
    time: 1720330200000,
  },
  {
    id: 2,
    sender: '챗터',
    lastMessage: '12반에 학관에서 봬요!',
    time: 1720416600000,
  },
];

export default function ChattingPage() {
  const sortedData = mockData.sort((a, b) => b.time - a.time);

  return (
    <>
      <div className="flex flex-col gap-4 select-none">
        {sortedData?.map(data => {
          const { hours, minutes } = formatDate(data.time);

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
              name={data.sender}
              lastMessage={data.lastMessage}
              time={formattedTime}
              id={data.id}
              key={data.id}
            />
          );
        })}
      </div>
    </>
  );
}
