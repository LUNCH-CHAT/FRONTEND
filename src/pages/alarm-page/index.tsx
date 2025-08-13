import { useEffect } from 'react';
import AlarmCard from '../../components/AlarmPage/AlarmCard';
import useGetAlarmList from '../../hooks/alarm/useGetAlarmList';
import { formatDate } from '../../utils/getDate';
import { useInView } from 'react-intersection-observer';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export default function AlarmPage() {
  const { data, isFetching, hasNextPage, isPending, isError, fetchNextPage } = useGetAlarmList();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return <div>Erorr</div>;
  }

  return (
    <>
      {data?.pages.flatMap(page => {
        const notifications = page.result.notifications;

        return notifications.map(noti => {
          const { month, day, hours, minutes } = formatDate(noti.createdAt);

          return (
            <div key={noti.id}>
              <AlarmCard
                sender={noti.senderMembername}
                image={noti.senderProfileImageUrl}
                content={noti.content}
                time={`${month}/${day} ${hours}:${minutes}`}
                type={noti.type}
              />
            </div>
          );
        });
      })}
      <div ref={ref}></div>
    </>
  );
}
