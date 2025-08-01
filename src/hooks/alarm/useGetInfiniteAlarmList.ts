import { useInfiniteQuery, type QueryFunctionContext } from '@tanstack/react-query';
import { getAlarmList } from '../../api/alarm';

function useGetInfiniteAlarmList() {
  return useInfiniteQuery({
    queryKey: ['notifications'],
    queryFn: ({ pageParam }: QueryFunctionContext<string[], number | undefined>) =>
      getAlarmList({
        lastNotificationId: pageParam,
        size: 20,
      }),
    initialPageParam: undefined,
    getNextPageParam: lastPage => {
      return lastPage.result.hasNext ? lastPage.result.lastNotificationId : undefined;
    },
  });
}

export default useGetInfiniteAlarmList;
