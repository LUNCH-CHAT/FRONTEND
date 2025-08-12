import { useInfiniteQuery, type QueryFunctionContext } from '@tanstack/react-query';
import { getMatchingList } from '../../api/match';

function useGetInfiniteMatchingList(status: 'ACCEPTED' | 'REQUESTED' | 'RECEIVED' | 'NONE') {
  return useInfiniteQuery({
    queryKey: ['matchingList', status],
    queryFn: ({ pageParam }: QueryFunctionContext<string[], number>) =>
      getMatchingList({
        status,
        page: pageParam,
        size: 10,
      }),
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage.result.meta.hasNext ? lastPage.result.meta.currentPage : undefined;
    },
  });
}
export default useGetInfiniteMatchingList;
