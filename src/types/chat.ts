import type { CommonResponse } from './common';

export type ChatRoom = {
  roomId: number;
  friendName: string;
  friendDepartment: string;
  lastMessage: string | null;
  lastMessageSentAt: Date | null;
  unreadCount: number;
};

// 채팅방 리스트 조회 응답
export type ResponseChatRoomListDto = CommonResponse<{
  data: ChatRoom[];
  meta: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNext: boolean;
  };
}>;

export type ChatRoomInfo = {
  chatRoomId: number;
  starterId: number;
  friendName: string;
  friendDepartment: string;
};

// 채팅방 생성 응답
export type ResponseCreateChatRoomDto = CommonResponse<ChatRoomInfo>;

// 채팅방 삭제 응답
export type ResponseDeleteChatRoomDto = CommonResponse<string>;

export type ChatMessage = {
  id: {
    timestamp: number;
    date: Date;
  };
  roomId: number;
  senderId: number;
  content: string;
  createdAt: Date;
};

// 채팅방 메시지 조회 응답
export type ResponseChatMessageDto = CommonResponse<{
  userId: number;
  friendId: number;
  data: ChatMessage[];
  meta: {
    pageSize: number;
    hasNext: boolean;
    nextCursor: string;
  };
}>;
