import type { CommonResponse } from './common';

export type ChatRoom = {
  roomId: number;
  friendName: string;
  lastMessage: string;
  lastMessageSentAt: Date;
  unreadCount: number;
};

// 채팅방 리스트 조회 응답
export type ResponseChatRoomListDto = CommonResponse<ChatRoom[]>;

// 채팅방 생성 요청
export type RequestCreateChatRoomDto = {
  starterId: number;
  friendId: number;
};

export type ChatRoomInfo = {
  chatRoomId: number;
  starterId: number;
  friendId: number;
};

// 채팅방 생성 응답
export type ResponseCreateChatRoomDto = CommonResponse<ChatRoomInfo>;

// 채팅방 삭제 응답
export type ResponseDeleteChatRoomDto = CommonResponse<string>;

export type ChatMessage = {
  id: number;
  roomId: number;
  senderId: number;
  content: string;
  createdAt: Date;
};

// 채팅방 메시지 조회 응답
export type ResponseChatMessageDto = CommonResponse<ChatMessage[]>;
