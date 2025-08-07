import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFCM from '../../hooks/alarm/useFCM';

export default function ProfileCompletePage() {
  const navigate = useNavigate();
  const [fadeout, setFadeOut] = useState(false);
  const [step, setStep] = useState(0);
  const { updateToken } = useFCM();

  useEffect(() => {
    if (step < 3) {
      const time = setTimeout(() => setStep(step + 1), 1000);
      return () => clearTimeout(time);
    }

    setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    setTimeout(() => {
      navigate(`/`);
    }, 3500);

    updateToken(); //로그인 직후 토큰 등록
  }, [step, navigate, updateToken]);

  return (
    <div
      className={`min-h-screen flex flex-col justify-center px-[65px] text-center text-white font-[pretendard] bg-gradient-to-b from-[#FFECEB] via-[#FF9B8E] to-[#FF7C6A] 
      transition-opacity duration-1000 ${fadeout ? 'opacity-0' : 'opacity-100'}`}
    >
      {step >= 0 && (
        <p className="text-[22px] font-bold mb-[31px] animate-fade-up">유엠씨님, 환영합니다!</p>
      )}
      {step >= 1 && (
        <h1 className="text-[20px] font-medium mb-[27px] animate-fade-up">Lunch with Insight!</h1>
      )}
      {step >= 2 && (
        <p className="text-[16px] font-medium animate-fade-up">
          혼자 먹는 점심, 텅 빈 강의 시간…
          <br />
          이제는 비슷한 관심사를 가진 친구 혹은
          <br />
          선배와 가볍게 이야기를 나눠요!
        </p>
      )}
    </div>
  );
}
