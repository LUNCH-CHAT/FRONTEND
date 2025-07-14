import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from '@/assets/icons/lunchat.svg';
import Google from '@/assets/icons/google-logo.svg';

export default function OnboardingPage() {
    const navigate = useNavigate();
    const [step,setStep] = useState(0);

    useEffect(() => {
        if (step < 5) {
        const time = setTimeout(() => setStep(step+1), 1000);
        return ()=>clearTimeout(time);
        }
    },[step]);

    return(
        <div className="bg-[url(/images/onbording.png)] h-screen bg-top flex justify-center items-center">
            <div className="text-center flex flex-col items-center justify-center">
                {step >= 0 && (<img src={Logo} alt="로고 이미지" className="w-[194px] h-15 animate-fade-up"/>)}
                <div className="mt-[42px]">
                    {step >= 1 && (<p className="text-black text-[16px] font-[pretendard] font-medium mb-[17px] leading-[22px] animate-fade-up">교내 커피챗 플랫폼,<br/>런치챗 Lunch with Insight!</p>)}
                    {step >= 2 && (<p className="text-[#7D7D7D] text-[13px] font-[pretendard] font-light tracking-[-0.3px] leading-[19px] animate-fade-up">혼자 먹는 점심, 텅 빈 공강 시간...<br/>이제는 비슷한 관심사를 가진 친구 혹은 선배와<br/>가볍게 이야기를 나눠요!</p>)}
                </div>
                <div className="mt-[110px] flex flex-col items-center">
                    {step >= 3 && (
                        <button 
                            type="button"
                            onClick={()=>{navigate(`/onboarding/email`)}}
                            className="w-[212px] h-[40px] bg-[#FF7C6A] rounded-[10px] text-center text-white font-[pretendard] text-4 leading-5 font-medium cursor-pointer mb-[10px] animate-fade-up">
                            이메일 로그인
                        </button>
                    )}
                    {step >= 4 && (
                        <button 
                            type="button" 
                            className="w-[212px] h-[40px] bg-white rounded-[10px] text-center text-black font-[pretendard] font-medium text-4 leading-5 cursor-pointer mb-[10px] flex items-center justify-center border border-[#D4D4D4] animate-fade-up">
                            <img src={Google} alt="구글 로고 이미지" className="size-[19px] pr-[7px]"/> 이메일 로그인
                        </button> 
                    )}
                    {step >= 5 && (<p className="text-center text-[#7D7D7D] font-[pretendard] font-light text-[13px] leading-[19px] animate-fade-up">학교 이메일 계정으로 로그인해 주세요!</p>)}
                </div>
            </div>
        </div>
  );
}
