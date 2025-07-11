import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/icons/lunchat.svg';
import Google from '@/assets/icons/google-logo.svg';

export default function OnboardingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[url(/images/onbording.png)] h-screen bg-top flex justify-center items-center">
      <div className="w-[226px] h-[418.12px] text-center flex flex-col justify-center">
        <img src={Logo} alt="로고 이미지" className="px-[19.5px] mb-[42px]" />
        <div>
          <p className="text-black text-[16px] font-[pretendard] font-medium mb-[17px] leading-[22px]">
            교내 커피챗 플랫폼,
            <br />
            런치챗 Lunch with Insight!
          </p>
          <p className="text-[#7D7D7D] text-[13px] font-[pretendard] font-light tracking-[-0.3px] leading-[19px]">
            혼자 먹는 점심, 텅 빈 공강 시간...
            <br />
            이제는 비슷한 관심사를 가진 친구 혹은 선배와
            <br />
            가볍게 이야기를 나눠요!
          </p>
        </div>
        <div className="mt-[110px] flex flex-col items-center ">
          <button
            type="button"
            onClick={() => {
              navigate(`/onboarding/email`);
            }}
            className="w-[212px] h-[40px] bg-[#FF7C6A] rounded-[10px] text-center text-white font-[pretendard] font-medium cursor-pointer mb-[10px]"
          >
            이메일 로그인
          </button>
          <button
            type="button"
            className="w-[212px] h-[40px] bg-white rounded-[10px] text-center text-black font-[pretendard] font-medium cursor-pointer flex items-center justify-center  border border-[#D4D4D4]"
          >
            <img src={Google} alt="구글 로고 이미지" className="size-[19px] pr-[7px]" /> 이메일
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}
