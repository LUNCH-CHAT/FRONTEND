import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyInfo, getUniv } from '../../api/my';
import useFCM from '../../hooks/alarm/useFCM';
import { LoadingSpinner } from '../../components/LoadingSpinner';

export default function ProfileCompletePage() {
  const navigate = useNavigate();
  const [fadeout, setFadeOut] = useState(false);
  const [step, setStep] = useState(-1);
  const [uniName, setUniName] = useState('');
  const [name, setName] = useState('');
  const { updateToken } = useFCM();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const data = await getUniv();
        handleUniName(data);
      } catch {
        console.log('실패');
      } finally {
        setIsLoading(false);
        setStep(0);
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
    if (step != -1 && step < 3) {
      const time = setTimeout(() => setStep(step + 1), 500);
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
    else if (uniName === '한국항공대') setUniName('한국항공대학교');
    else if (uniName === '이화여대') setUniName('이화여자대학교');
    else if (uniName === 'UMC대' || uniName === 'UMC') setUniName('UMC대학교');
  };

  if (isLoading) {
    return <LoadingSpinner />
  }
  return (
    <div
      className={`min-h-[100dvh] flex flex-col justify-center px-[65px] text-center text-white font-[pretendard] bg-gradient-to-b from-[#FFECEB] via-[#FF9B8E] to-[#FF7C6A] 
      transition-opacity duration-1000 ${fadeout ? 'opacity-0' : 'opacity-100'}`}
    >
    <p className="text-[22px] font-semibold mb-[31px] animate-fade-up">{uniName} 런치챗</p>

    <p className={`text-[22px] font-bold mb-[31px] ${step >= 1 ? ' animate-fade-up' : 'opacity-0'}`}>
      <span className="font-black">{name}</span>님, 환영합니다!
    </p>

    <h1 className={`text-[20px] font-medium mb-[27px] ${step >= 2 ? ' animate-fade-up' : 'opacity-0'}`}>Lunch with Insight!</h1>
    
    <p className={`text-[16px] font-medium ${step >= 3 ? ' animate-fade-up' : 'opacity-0'}`}>
      혼자 먹는 점심, 텅 빈 강의 시간…
      <br />
      이제는 비슷한 관심사를 가진 친구 혹은
      <br />
      선배와 가볍게 이야기를 나눠요!
    </p>
    </div>
  );
}
