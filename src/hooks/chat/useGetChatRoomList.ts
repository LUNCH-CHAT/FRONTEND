import { useQuery } from '@tanstack/react-query';
import { getChatList } from '../../api/chat';

function useGetChatRoomList(userId: number) {
  return useQuery({
    queryKey: ['chatRooms'],
    queryFn: () => getChatList(userId),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5, // 5m
    gcTime: 1000 * 60 * 410, //10m,
    select: data => data.result,
  });
}

export default useGetChatRoomList;
