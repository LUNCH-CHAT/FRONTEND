import AlarmCard from '../../components/AlarmPage/AlarmCard';
import { formatDate } from '../../utils/getDate';

const mockData = [
  {
    id: 1,
    sender: '유엠씨',
    type: 'request',
    time: 1720330200000,
  },
  {
    id: 2,
    sender: '챗터',
    type: 'accept',
    time: 1720416600000,
  },
];

export default function AlarmPage() {
  const sortedData = mockData.sort((a, b) => b.time - a.time);

  return (
    <>
      {/* <BackHeader title="알림" /> */}
      {sortedData?.map(data => {
        const { month, day, hours, minutes } = formatDate(data.time);

        return (
          <div key={data.id}>
            <AlarmCard
              sender={data.sender}
              type={data.type === 'request' ? '요청' : '수락'}
              time={`${month}/${day} ${hours}:${minutes}`}
            />
          </div>
        );
      })}
    </>
  );
}
