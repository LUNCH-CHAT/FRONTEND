import { useInfiniteQuery, type QueryFunctionContext } from '@tanstack/react-query';
import { getChatList } from '../../api/chat';

function useGetChatRoomList() {
  return useInfiniteQuery({
    queryKey: ['chatRooms'],
    queryFn: ({ pageParam }: QueryFunctionContext<string[], string | undefined>) =>
      getChatList({
        size: 10,
        cursor: pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: lastpage => {
      return lastpage.result.meta.hasNext ? lastpage.result.meta.nextCursor : undefined;
    },
  });
}

export default useGetChatRoomList;
