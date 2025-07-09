import { useState } from "react"
import TimeTable from "../../components/TimeTable"
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal";
import TagSelectList from "../../components/TagSelect/TagSelectList";

export default function ProfileStepPage() {
  const [step, setStep] = useState(0)
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const modalText="런치챗은 교내 자기계발을 위한\n관심사 기반 밥약/커피챗 플랫폼입니다.\n건강한 소통 문화를 위해\n실명제로 운영됩니다.";

  const handleModalClose=()=>{
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen px-[22px] pt-[43px] pb-[23px]">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-black text-[20px] font-[pretendard] font-semibold mb-[10px]">프로필 작성중</p>
            <p className="text-[#B6B6B6] text-[13px] font-[pretendard] font-regular">* 매칭을 위한 필수 정보입니다!<br/>* 추후 프로필 수정에서 수정 가능합니다.</p>
          </div>
          <img src={`/src/assets/icons/step${step+1}.svg`} alt={`스탭 ${step+1} 이미지`} />
        </div>
        {step === 0 && (
          <>
            <p className="text-black text-[22px] font-[pretendard] font-semibold mt-[57px] mb-[25px] flex items-center">
              <span className="text-[#FF7C6A] font-bold">실명</span>을 적어주세요 
              <button className="cursor-pointer ml-[9px]" onClick={()=>{setModalOpen(true)}}><img src="/src/assets/icons/help.svg" alt="안내 로고 이미지" className="size-[16.77px]"/></button>
            </p>
            <input
              type="text"
              id="name"
              name="schoolEmail"
              placeholder="이름을 입력하세요"
              className="w-full text-black text-[16px] font-[pretendard] font-medium border-b border-[#7D7D7D] focus:border-[#FF7C6A] focus:outline-none "/>
          </>  
        )}
        {step === 1 && (
          <>
            <p className="text-black text-[22px] font-[pretendard] font-semibold mt-[57px] mb-[25px] flex items-center">
              <span className="text-[#FF7C6A] font-bold">학번</span>을 적어주세요
            </p>
            <input
              type="text"
              id="name"
              name="schoolEmail"
              placeholder="ex) 25"
              className="w-full text-black text-[16px] font-[pretendard] font-medium border-b border-[#7D7D7D] focus:border-[#FF7C6A] focus:outline-none "/>
          </>
        )}
        {step === 2 && (
          <>
            <p className="text-black text-[22px] font-[pretendard] font-semibold mt-[57px] mb-[25px] flex items-center">
              <span className="text-[#FF7C6A] font-bold">학과</span>를 선택해주세요
            </p>
            <div className="flex gap-[19px]">
              <select
                id="school"
                name="school"
                className="w-full border-b border-[#7D7D7D] text-[16px] font-[pretendard] font-regular focus:border-[#FF7C6A]">
                <option value="" disabled hidden className="text-[#B6B6B6]">단과대 선택</option>
                <option>인문과학대학</option>
                <option>사회과학대학</option>
              </select>
              <select
                id="major"
                name="major"
                className="w-full border-b border-[#7D7D7D] text-[16px] font-[pretendard] font-regular focus:border-[#FF7C6A]">
                <option value="" disabled hidden className="text-[#B6B6B6]">학과 선택</option>
                <option>컴공</option>
                <option>미콘</option>
              </select>
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <p className="text-black text-[22px] font-[pretendard] font-semibold mt-[57px] mb-[6px]">
              런치챗,&nbsp;<span className="text-[#FF7C6A] font-bold">어떤 목적</span>으로 시작하시나요?
            </p>
            <p className="text-[#FF7C6A] text-[13px] font-[pretendard] font-medium mb-[40px]">
              최대 3개까지 선택 가능합니다.
            </p>
            <div className="w-full">
            <TagSelectList/>
            </div>
          </>
        )}
        {step === 4 && (
          <div className="flex flex-col items-center px-[20px]">
            <p className="text-black text-[22px] font-[pretendard] font-semibold mt-[50px] mb-[10px] text-center">
              <span className="text-[#FF7C6A] font-bold">런치챗이 가능한 시간대</span>를<br/>선택해주세요
            </p>
            <p className="text-[#B6B6B6] text-[12px] font-[pretendard] font-regular mb-[34px]">
              * 본 시간대는 이화여대 시간표 기준입니다.
            </p>
            <TimeTable isEditable={true}/>
          </div>
        )}
        {step ===5 && (
          <>
            {navigate(`/onboarding/complete`)}
          </>
        )}
        <div className="mt-auto">
          <button
            type="button"
            onClick={() => setStep(step+1)}
            className="w-full h-[48px] bg-[#FF7C6A] rounded-[10px] text-center text-white font-[pretendard] font-semibold cursor-pointer">
            다음
          </button>
        </div>
      </div>
      {modalOpen && (
        <Modal
          modalText={modalText}
          onClose={handleModalClose}/>
      )}
    </div>
    
  )
}
