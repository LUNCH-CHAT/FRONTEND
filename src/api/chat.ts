import { axiosInstance } from './axios';
import type {
  ResponseChatMessageDto,
  ResponseChatRoomListDto,
  ResponseCreateChatRoomDto,
  ResponseDeleteChatRoomDto,
} from '../types/chat';

// 채팅방 리스트 조회
export const getChatList = async ({
  size,
  page,
}: {
  size: number;
  page: number;
}): Promise<ResponseChatRoomListDto> => {
  const { data } = await axiosInstance.get('/api/chatrooms', {
    params: {
      size,
      page,
    },
  });

  return data;
};

// 채팅방 생성(채팅하기)
export const createChatRoom = async (friendId: number): Promise<ResponseCreateChatRoomDto> => {
  const { data } = await axiosInstance.post('/api/chatrooms', null, {
    params: { friendId },
  });

  return data;
};

// 채팅방 퇴장
export const deleteChatRoom = async ({
  roomId,
  userId,
}: {
  roomId: number;
  userId: number;
}): Promise<ResponseDeleteChatRoomDto> => {
  const { data } = await axiosInstance.patch(`/api/chatrooms/${roomId}`, {
    params: { roomId, userId },
  });

  return data;
};

// 채팅방 내 메시지 조회
export const getChatMessages = async ({
  roomId,
  size,
  cursor,
}: {
  roomId: number;
  size: number;
  cursor: string | undefined;
}): Promise<ResponseChatMessageDto> => {
  const { data } = await axiosInstance.get(`/api/chatrooms/${roomId}/messages`, {
    params: { roomId, size, cursor },
  });

  return data;
};
