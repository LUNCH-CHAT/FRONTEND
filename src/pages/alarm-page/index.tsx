import { useEffect } from 'react';
import AlarmCard from '../../components/AlarmPage/AlarmCard';
import useGetInfiniteAlarmList from '../../hooks/alarm/useGetInfiniteAlarmList';
import { formatDate } from '../../utils/getDate';
import { useInView } from 'react-intersection-observer';

export default function AlarmPage() {
  const { data, isFetching, hasNextPage, isPending, isError, fetchNextPage } =
    useGetInfiniteAlarmList();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Erorr</div>;
  }

  return (
    <>
      {data?.pages.map(page => {
        const notifications = page.result.notifications;

        notifications.map(noti => {
          const { month, day, hours, minutes } = formatDate(noti.createdAt);

          return (
            <div key={noti.id}>
              <AlarmCard
                sender={noti.senderMembername}
                image={noti.senderProfileImageUrl}
                content={noti.content}
                time={`${month}/${day} ${hours}:${minutes}`}
              />
            </div>
          );
        });
      })}
      <div ref={ref}></div>
    </>
  );
}
