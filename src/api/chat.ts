import axios from 'axios';
import type {
  RequestCreateChatRoomDto,
  ResponseChatMessageDto,
  ResponseChatRoomListDto,
  ResponseCreateChatRoomDto,
  ResponseDeleteChatRoomDto,
} from '../types/chat';

// 채팅방 리스트 조회
export const getChatList = async (userId: string): Promise<ResponseChatRoomListDto> => {
  const { data } = await axios.get('/api/chatrooms', {
    params: userId,
  });

  return data;
};

// 채팅방 생성
export const createChatRoom = async ({
  starterId,
  friendId,
}: RequestCreateChatRoomDto): Promise<ResponseCreateChatRoomDto> => {
  const { data } = await axios.post('/api/chatrooms', {
    starterId,
    friendId,
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
  const { data } = await axios.patch(`/api/chatrooms/{roomId}`, {
    params: { roomId, userId },
  });

  return data;
};

// 채팅방 내 메시지 조회
export const getChatMessages = async ({
  roomId,
  userId,
}: {
  roomId: number;
  userId: number;
}): Promise<ResponseChatMessageDto> => {
  const { data } = await axios.get(`/api/chatrooms/{roomId}/messages`, {
    params: { roomId, userId },
  });

  return data;
};
