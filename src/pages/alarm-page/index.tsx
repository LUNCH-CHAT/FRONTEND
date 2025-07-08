import AlarmCard from '../../components/AlarmPage/AlarmCard';
// import BackHeader from '../../components/Headers/BackHeader';

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

function formatDate(input: string | number) {
  const date = new Date(input);

  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월 (0~11)
  const day = String(date.getDate()).padStart(2, '0'); // 일
  const hours = String(date.getHours()).padStart(2, '0'); // 시
  const minutes = String(date.getMinutes()).padStart(2, '0'); // 분

  return { month, day, hours, minutes };
}

export default function AlarmPage() {
  const sortedData = mockData.sort((a, b) => b.time - a.time);

  return (
    <div>
      {/* <BackHeader title="알림" /> */}
      <div className="pt-[5rem]">
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
      </div>
    </div>
  );
}
