import AlarmCard from '../../components/AlarmPage/AlarmCard';
import { formatDate } from '../../utils/getDate';

const mockData = [
  {
    id: 1,
    sender: '유엠씨',
    type: 'request',
    time: '2025-07-30T09:14:57.183Z',
  },
  {
    id: 2,
    sender: '챗터',
    type: 'accept',
    time: '2025-07-30T09:14:57.183Z',
  },
];

export default function AlarmPage() {
  const sortedData = mockData.sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

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
