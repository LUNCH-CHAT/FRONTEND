import type { CommonResponse } from './common';

export type AlarmList = {
  id: number;
  type: string;
  content: string;
  isRead: boolean;
  senderMembername: string;
  senderProfileImageUrl: string;
  createdAt: Date;
};

// 알림 목록 조회 응답
export type ResponseAlarmListDto = CommonResponse<{
  notifications: AlarmList[];
  lastNotificationId: number;
  hasNext: boolean;
  size: number;
}>;
