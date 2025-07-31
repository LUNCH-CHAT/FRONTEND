import { axiosInstance } from './axios';

const registerFcmToken = async (token: string) => {
  try {
    await axiosInstance.patch(`/api/members/fcm-token`, {
      fcmToken: token,
    });
  } catch (error) {
    console.error('registerFcmToken api error', error);
  }
};

export default registerFcmToken;
