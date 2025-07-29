import axios from 'axios';

const registerFcmToken = async (memberId: string, token: string) => {
  try {
    await axios.patch(`/api/members/${memberId}/fcm-tokens`, {
      fcmToken: token,
    });
  } catch (error) {
    console.error('registerFcmToken api error', error);
  }
};

export default registerFcmToken;
