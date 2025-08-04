import { useInfiniteQuery, type QueryFunctionContext } from '@tanstack/react-query';
import { getMatchingList } from '../../api/match';

function useGetInfiniteMatchingList(status: 'ACCEPTED' | 'REQUESTED' | 'RECEIVED' | 'NONE') {
  return useInfiniteQuery({
    queryKey: ['matchingList', status],
    queryFn: ({ pageParam }: QueryFunctionContext<string[], number>) =>
      getMatchingList({
        status,
        page: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage.result.hasNext ? lastPage.result.totalPage : undefined;
    },
  });
}
export default useGetInfiniteMatchingList;
