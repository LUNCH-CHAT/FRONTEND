import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmailStepPage() {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const navigate = useNavigate();

  return (
    <div>
      {/* <BackHeader /> */}
      {step === 'email' && (
        <div className="flex flex-col">
          <p className="text-black text-[20px] font-[pretendard] font-semibold leading-[22px] mb-[44px] px-[20px]">
            <span className="text-[#FF7C6A] font-bold">학교 이메일</span>을 입력해주세요
          </p>
          <div className="px-[20px]">
            <input
              type="email"
              id="schoolEmail"
              name="schoolEmail"
              placeholder="lunchchat@ewha.ac.kr"
              className="w-full text-black text-[16px] font-[pretendard] font-medium leading-[20px] border-b border-[#7D7D7D] focus:border-[#FF7C6A] focus:outline-none"
            />
          </div>
          <div className="fixed bottom-0 px-[20px] pb-[23px] w-full">
            <button
              type="submit"
              onClick={() => setStep('code')}
              className="w-full h-[48px] bg-[#FF7C6A] rounded-[10px] text-center text-white font-[pretendard] font-semibold cursor-pointer"
            >
              인증번호 보내기
            </button>
          </div>
        </div>
      )}

      {step === 'code' && (
        <div className="flex flex-col pb-[23px]">
          <p className="text-black text-[20px] font-[pretendard] font-semibold leading-[30px] mb-[44px] text-center px-[20px]">
            이메일로 받은 <span className="text-[#FF7C6A] font-bold">인증번호</span>를<br />
            입력해주세요
          </p>

          <div className="flex justify-center gap-[10px] px-[20px]">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <input
                  key={i}
                  maxLength={1}
                  type="text"
                  className="w-[40px] border-b border-[#7D7D7D] outline-none text-center font-[pretendard] font-semibold text-[22px] focus:border-[#FF7C6A]"
                />
              ))}
          </div>

          <div className="w-full fixed bottom-0 flex flex-col items-center px-[20px] pb-[23px]">
            <button
              type="button"
              className="inline-block border-b border-[#FF7C6A] text-[#FF7C6A] font-[pretendard] font-medium text-[13px] mb-[13px] cursor-pointer"
            >
              인증번호 다시 받기
            </button>

            <button
              type="button"
              className="w-full h-[48px] bg-[#FF7C6A] rounded-[10px] text-center text-white font-[pretendard] font-semibold cursor-pointer"
              onClick={() => {
                navigate(`/onboarding/profile`);
              }}
            >
              인증하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
