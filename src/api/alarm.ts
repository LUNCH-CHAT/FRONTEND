import type { ResponseAlarmListDto } from '../types/alarm';
import { axiosInstance } from './axios';

// fcm 토큰 업데이트
export const registerFcmToken = async (token: string) => {
  try {
    await axiosInstance.patch(`/api/members/fcm-token`, {
      fcmToken: token,
    });
  } catch (error) {
    console.error('registerFcmToken api error', error);
  }
};

// 알림 목록 조회
export const getAlarmList = async ({
  lastNotificationId,
  size,
}: {
  lastNotificationId?: number;
  size: number;
}): Promise<ResponseAlarmListDto> => {
  const { data } = await axiosInstance.get(`/api/notifications`, {
    params: {
      lastNotificationId,
      size,
    },
  });

  return data;
};
