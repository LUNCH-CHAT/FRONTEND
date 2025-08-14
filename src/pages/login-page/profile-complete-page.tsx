import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyInfo, getUniv } from '../../api/my';
import useFCM from '../../hooks/alarm/useFCM';

export default function ProfileCompletePage() {
  const navigate = useNavigate();
  const [fadeout, setFadeOut] = useState(false);
  const [step, setStep] = useState(0);
  const [uniName, setUniName] = useState('');
  const [name, setName] = useState('');
  const { updateToken } = useFCM();

  useEffect(() => {
    (async () => {
      try {
        const data = await getUniv();
        handleUniName(data);
      } catch {
        console.log('실패');
      }
    })();

    (async () => {
      try {
        const data = await getMyInfo();
        setName(data.result.name);
      } catch {
        console.log('실패');
      }
    })();
  },[]);

  useEffect(() => {
    updateToken(); //로그인 직후 토큰 등록
  },[updateToken]);

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
  }, [step, navigate]);

  const handleUniName = (uniName: string) => {
    if (uniName === '가톨릭대') setUniName('가톨릭대학교');
    else if (uniName === '항공대') setUniName('항공대학교');
    else if (uniName === '이화여대') setUniName('이화여자대학교');
    else if (uniName === 'UMC대') setUniName('UMC대학교');
  };

  return (
    <div
      className={`min-h-[100dvh] flex flex-col justify-center px-[65px] text-center text-white font-[pretendard] bg-gradient-to-b from-[#FFECEB] via-[#FF9B8E] to-[#FF7C6A] 
      transition-opacity duration-1000 ${fadeout ? 'opacity-0' : 'opacity-100'}`}
    >
      {step >= 0 && (
        <p className="text-[22px] font-semibold mb-[31px] animate-fade-up">{uniName} 런치챗</p>
      )}
      {step >= 1 && (
        <p className="text-[22px] font-bold mb-[31px] animate-fade-up">
          <span className="font-black">{name}</span>님, 환영합니다!
        </p>
      )}
      {step >= 2 && (
        <h1 className="text-[20px] font-medium mb-[27px] animate-fade-up">Lunch with Insight!</h1>
      )}
      {step >= 3 && (
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
