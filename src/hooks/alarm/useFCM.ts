import { useEffect, useRef } from 'react';
import { requestNotificationPermission } from '../../firebase/messaging';
import { registerFcmToken } from '../../api/alarm';

const useFCM = () => {
  const initialized = useRef(false);
  const previousToken = useRef<string | null>(null);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    // 비로그인 상태일 경우 리턴
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return;

    const updateToken = () => {
      // 알림 권한 요청 및 토큰 발급
      requestNotificationPermission()
        .then(token => {
          if (!token) return;

          if (token !== previousToken.current) {
            registerFcmToken(token);
            previousToken.current = token;
          }
        })
        .catch(e => {
          console.error(e);
        });
    };

    updateToken();

    // 일정 시간 간격으로 이전 토큰과 비교
    const interval = setInterval(() => {
      updateToken();
    }, 1000 * 60 * 60); // 1시간 간격

    return () => clearInterval(interval);
  }, []);
};

export default useFCM;
