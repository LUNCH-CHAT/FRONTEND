import { useInfiniteQuery, type QueryFunctionContext } from '@tanstack/react-query';
import { getChatList } from '../../api/chat';

function useGetChatRoomList() {
  return useInfiniteQuery({
    queryKey: ['chatRooms'],
    queryFn: ({ pageParam }: QueryFunctionContext<string[], number>) =>
      getChatList({
        size: 10,
        page: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: lastpage => {
      return lastpage.result.meta.hasNext ? lastpage.result.meta.currentPage : undefined;
    },
  });
}

export default useGetChatRoomList;
