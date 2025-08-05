import { useInfiniteQuery, type QueryFunctionContext } from '@tanstack/react-query';
import { getChatMessages } from '../../api/chat';

const useGetChatMessages = (roomId: number) => {
  return useInfiniteQuery({
    queryKey: ['chatMessages', roomId],
    queryFn: ({ pageParam }: QueryFunctionContext<(string | number)[], string | undefined>) =>
      getChatMessages({
        roomId,
        size: 20,
        cursor: pageParam,
      }),
    initialPageParam: undefined,
    getNextPageParam: lastpage => {
      return lastpage.result.meta.hasNext ? lastpage.result.meta.nextCursor : undefined;
    },
  });
};

export default useGetChatMessages;
