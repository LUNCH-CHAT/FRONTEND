import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import Logo from '@/assets/icons/lunchat.svg';
import Google from '@/assets/icons/google-logo.svg';

export default function OnboardingPage() {
  //const navigate = useNavigate();
  
  {/* 테스트 할 때 번거로워서 잠시 애니메이션 중지하겠습니다 */}
  const [step,setStep] = useState(0); 
//  const [step,setStep] = useState(5);

  useEffect(() => {
    if (step < 5) {
      const time = setTimeout(() => setStep(step+1), 1000);
      return ()=>clearTimeout(time);
    }
  },[step]);

  const redirectUri = encodeURIComponent(`${import.meta.env.VITE_API_URL}/auth/callback/google`);
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  const handleGoogleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=email%20profile&access_type=offline&service=lso&o2v=2&flowName=GeneralOAuthFlow`;
  }
  return(
    <div className="bg-[#FFE9E7] min-h-[100dvh] flex justify-center items-center">
      <div className="text-center flex flex-col items-center justify-center">
        {step >= 0 && (
          <img src={Logo} alt="로고 이미지" className="w-[194px] h-15 animate-fade-up"/>
        )}
        <div className="mt-[42px]">
          {step >= 1 && (
            <>
              <p className="text-black text-[16px] font-[pretendard] font-medium mb-[17px] leading-[22px] animate-fade-up">
                교내 커피챗 플랫폼,
                <br />
                런치챗 Lunch with Insight!
              </p>
              <p className="text-[#7D7D7D] text-[13px] font-[pretendard] font-light tracking-[-0.3px] leading-[19px] animate-fade-up">
                혼자 먹는 점심, 텅 빈 공강 시간...
                <br />
                이제는 비슷한 관심사를 가진 친구 혹은 선배와
                <br />
                가볍게 이야기를 나눠요!
              </p>
            </>
          )}
        </div>
        <div className="mt-[110px] flex flex-col items-center">
          {/* {step >= 2 && ( //주석 해제 시 아래 step 숫자 +1 해줘야함 
            <button 
              type="button"
              onClick={() => {
                navigate(`/onboarding/email`)
              }}
              className="w-[212px] h-[40px] bg-[#F56156] rounded-[10px] text-center text-white font-[pretendard] text-4 leading-5 font-medium cursor-pointer mb-[10px] animate-fade-up">
              이메일 로그인
            </button>
          )} */}
          {step >= 2 && (
            <button 
              type="button" 
              onClick={handleGoogleLogin}
              className="w-[212px] h-[40px] bg-white rounded-[10px] text-center text-black font-[pretendard] font-medium text-4 leading-5 cursor-pointer mb-[10px] flex items-center justify-center border border-[#D4D4D4] animate-fade-up">
              <img src={Google} alt="구글 로고 이미지" className="size-[19px] pr-[7px]"/> 이메일 로그인
            </button> 
          )}
          {step >= 3 && (
            <p className="text-center text-[#7D7D7D] font-[pretendard] font-light text-[13px] leading-[19px] animate-fade-up">
              학교 이메일 계정으로 로그인해 주세요!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
