import { useEffect } from 'react';
import { requestNotificationPermission } from '../../firebase/messaging';
import { registerFcmToken } from '../../api/alarm';

const useFCM = () => {
  useEffect(() => {
    // 비로그인 상태일 경우 리턴
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    // 알림 권한 요청 및 토큰 발급
    requestNotificationPermission()
      .then(token => {
        if (!token) return;

        // 서버에 토큰 등록
        return registerFcmToken(token);
      })
      .catch(e => {
        console.error(e);
      });
  }, []);
};

export default useFCM;
