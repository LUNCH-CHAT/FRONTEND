import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateSignin } from '../../utils/validate';
import Modal from '../../components/Modal';

export default function EmailStepPage() {
  const [step, setStep] = useState<'email' | 'code'>('email');
  const navigate = useNavigate();
  const [schoolEmail,setSchoolEmail] = useState("");
  const [code,setCode] = useState(["", "", "", "", ""]);
  const [error,setError] = useState("");
  const [modalOpen,setModalOpen] = useState(false);
  const isEmailDisabled = schoolEmail.trim() === "";


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSchoolEmail(e.target.value);
  };

  const handleEmailClick = () => {
    if (error==""){
      setStep('code');
    } else {
      setModalOpen(true);
    }
  }

  const handleCodeChange = (index: number, value: string) => {
    const newCode = [...code];
    newCode[index]=value;
    setCode(newCode);
  };

  const handleCodeClick = () => {
    {/*일단 11111만 통과하도록 설정*/}
    if (code.join("") === "11111"){
      navigate(`/onboarding/profile`);
    } else {
      setModalOpen(true);
    }
  }

  const modalClose = () => {
    setModalOpen(false);
  }

  useEffect(()=>{
    const newError=validateSignin({email: schoolEmail});
    setError(newError.email);
  },[schoolEmail])


  return (
    <div>
      {/* <BackHeader /> */}
      {step === 'email' && (
        <div className="flex flex-col">
          <p className="text-black text-[20px] font-[pretendard] font-semibold leading-[22px] mb-[44px] px-[20px]">
            <span className="text-[#F56156] font-bold">학교 이메일</span>을 입력해주세요
          </p>
          <div className="px-[20px]">
            <input
              type="email"
              onChange={handleEmailChange}
              placeholder="lunchchat@ewha.ac.kr"
              className="w-full text-black text-[16px] font-[pretendard] font-medium leading-[20px] border-b border-[#7D7D7D] focus:border-[#F56156] focus:outline-none"
            />
          </div>
          <div className="fixed max-w-[480px] bottom-0 px-[20px] pb-[23px] w-full">
            <button
              type="button"
              onClick={handleEmailClick}
              className={`w-full h-[48px] rounded-[10px] text-center text-white font-[pretendard] font-semibold cursor-pointer ${isEmailDisabled ? 'bg-gray-300' : 'bg-[#F56156]'}`}
            >
              인증번호 보내기
            </button>
          </div>
          {modalOpen && (
          <>
            <Modal modalText={error} onClose={modalClose}/>
          </>
        )}
        </div>
        
      )}

      {step === 'code' && (
        <div className="flex flex-col pb-[23px]">
          <p className="text-black text-[20px] font-[pretendard] font-semibold leading-[30px] mb-[44px] text-center px-[20px]">
            이메일로 받은 <span className="text-[#F56156] font-bold">인증번호</span>를<br />
            입력해주세요
          </p>

          <div className="flex justify-center gap-[10px] px-[20px]">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <input
                  key={i}
                  maxLength={1}
                  onChange={(e) => handleCodeChange(i, e.target.value)}
                  type="text"
                  className="w-[40px] border-b border-[#7D7D7D] outline-none text-center font-[pretendard] font-semibold text-[22px] focus:border-[#F56156]"
                />
              ))}
          </div>

          <div className="w-full fixed max-w-[480px] bottom-0 flex flex-col items-center px-5 pb-4">
            <button
              type="button"
              className="inline-block border-b border-[#F56156] text-[#F56156] font-[pretendard] font-medium text-[13px] mb-[13px] cursor-pointer"
            >
              인증번호 다시 받기
            </button>

            <button
              type="button"
              className="w-full h-[48px] bg-[#F56156] rounded-[10px] text-center text-white font-[pretendard] font-semibold cursor-pointer"
              onClick={handleCodeClick}
            >
              인증하기
            </button>
          </div>
          {modalOpen && (
            <Modal modalText='인증번호가 일치하지 않아요' onClose={modalClose}/>
          )}
        </div>
      )}
    </div>
  );
}
