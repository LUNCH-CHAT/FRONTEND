import { useState } from 'react';
import TimeTable from '../../components/TimeTable';
import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import TagSelectList from '../../components/TagSelect/TagSelectList';
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import Help from '@/assets/icons/help.svg';
import DropDown from '@/assets/icons/dropdown.svg';
import Step1 from '@/assets/icons/step1.svg';
import Step2 from '@/assets/icons/step2.svg';
import Step3 from '@/assets/icons/step3.svg';
import Step4 from '@/assets/icons/step4.svg';
import Step5 from '@/assets/icons/step5.svg';

export default function ProfileStepPage() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectCollege, setSelectCollege] = useState('');
  const [selectMajor, setSelectMajor] = useState('');

  const StepImages =
    step === 0
      ? Step1
      : step === 1
      ? Step2
      : step === 2
      ? Step3
      : step === 3
      ? Step4
      : step === 4
      ? Step5
      : undefined;

  const college = ['인문과학대학', '자연과학대학', '사회과학대학', '음악대학'];

  const major = ['국어국문학과', '중어중문학과', '불어불문학과', '독어독문학과'];

  const modalText =
    '런치챗은 교내 자기계발을 위한\n관심사 기반 밥약/커피챗 플랫폼입니다.\n건강한 소통 문화를 위해\n실명제로 운영됩니다.';

  const handleModalClose = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div className="flex flex-col">
        <div className="flex justify-between items-start px-[22px]">
          <div>
            <p className="text-black text-[20px] font-[pretendard] font-semibold mb-[10px]">
              프로필 작성중
            </p>
            <p className="text-[#B6B6B6] text-[13px] font-[pretendard] font-regular">
              * 매칭을 위한 필수 정보입니다!
              <br />* 추후 프로필 수정에서 수정 가능합니다.
            </p>
          </div>
          <img src={StepImages} alt={`스탭 ${step + 1} 이미지`} />
        </div>
        {step === 0 && (
          <div className="px-[22px] ">
            <p className="text-black text-[22px] font-[pretendard] font-semibold mt-[57px] mb-[25px] flex items-center">
              <span className="text-[#FF7C6A] font-bold">실명</span>을 적어주세요
              <button
                className="cursor-pointer ml-[9px]"
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                <img src={Help} alt="안내 로고 이미지" className="size-[16.77px]" />
              </button>
            </p>
            <input
              type="text"
              id="name"
              name="schoolEmail"
              placeholder="이름을 입력하세요"
              className="w-full text-black text-[16px] font-[pretendard] font-medium border-b border-[#7D7D7D] focus:border-[#FF7C6A] focus:outline-none "
            />
          </div>
        )}
        {step === 1 && (
          <div className="px-[22px]">
            <p className="text-black text-[22px] font-[pretendard] font-semibold mt-[57px] mb-[25px] flex items-center">
              <span className="text-[#FF7C6A] font-bold">학번</span>을 적어주세요
            </p>
            <input
              type="text"
              id="name"
              name="schoolEmail"
              placeholder="ex) 25"
              className="w-full text-black text-[16px] font-[pretendard] font-medium border-b border-[#7D7D7D] focus:border-[#FF7C6A] focus:outline-none "
            />
          </div>
        )}
        {step === 2 && (
          <div className="px-[22px]">
            <p className="text-black text-[22px] font-[pretendard] font-semibold mt-[57px] mb-[25px] flex items-center">
              <span className="text-[#FF7C6A] font-bold">학과</span>를 선택해주세요
            </p>

            <div className="flex w-full gap-[19px]">
              <Listbox value={selectCollege} onChange={setSelectCollege}>
                <div className="relative w-full">
                  <ListboxButton
                    className={`w-full pb-1 border-b border-[#7D7D7D] text-left focus:border-[#FF7C6A] text-[16px] font-[pretendard] font-medium 
                    ${selectCollege ? 'text-black' : 'text-[#B6B6B6]'}`}
                  >
                    <div className="flex justify-between items-center">
                      {selectCollege || '단과대 선택'}
                      <img src={DropDown} alt="드롭다운" className="size-3 cursor-pointer" />
                    </div>
                  </ListboxButton>

                  {/* 옵션 */}
                  <ListboxOptions className="absolute right-0 w-[127px] px-[11px] py-[10px] border border-[#D4D4D4] mt-1 flex flex-col gap-3">
                    {college.map((value, idx) => (
                      <ListboxOption
                        key={idx}
                        value={value}
                        className="select-none text-4 font-[pretendard] font-regular leading-4"
                      >
                        {value}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>

              <Listbox value={selectMajor} onChange={setSelectMajor}>
                <div className="relative w-full">
                  <ListboxButton
                    className={`w-full pb-1 border-b border-[#7D7D7D] text-left focus:border-[#FF7C6A] text-[16px] font-[pretendard] font-medium 
                    ${selectMajor ? 'text-black' : 'text-[#B6B6B6]'}`}
                  >
                    <div className="flex justify-between items-center">
                      {selectMajor || '학과 선택'}
                      <img src={DropDown} alt="드롭다운" className="size-3 cursor-pointer" />
                    </div>
                  </ListboxButton>

                  {/* 옵션 */}
                  <ListboxOptions className="absolute right-0 w-[127px] px-[11px] py-[10px] border border-[#D4D4D4] mt-1 flex flex-col gap-3">
                    {major.map((value, idx) => (
                      <ListboxOption
                        key={idx}
                        value={value}
                        className="select-none text-4 font-[pretendard] font-regular leading-4"
                      >
                        {value}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
          </div>
        )}
        {step === 3 && (
          <div className="px-[22px]">
            <p className="text-black text-[22px] font-[pretendard] font-semibold mt-[57px] mb-[6px]">
              런치챗,&nbsp;<span className="text-[#FF7C6A] font-bold">어떤 목적</span>으로
              시작하시나요?
            </p>
            <p className="text-[#FF7C6A] text-[13px] font-[pretendard] font-medium mb-[40px]">
              최대 3개까지 선택 가능합니다.
            </p>
            <div className="w-full">
              <TagSelectList />
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="flex flex-col items-center px-[20px]">
            <p className="text-black text-[22px] font-[pretendard] font-semibold mt-[50px] mb-[10px] text-center">
              <span className="text-[#FF7C6A] font-bold">런치챗이 가능한 시간대</span>를<br />
              선택해주세요
            </p>
            <p className="text-[#B6B6B6] text-[12px] font-[pretendard] font-regular mb-[34px]">
              * 본 시간대는 이화여대 시간표 기준입니다.
            </p>
            <TimeTable isEditable={true} />
          </div>
        )}
        {step === 5 && <>{navigate(`/onboarding/complete`)}</>}
        <div className="fixed max-w-[480px] bottom-0 px-5 w-full pb-4">
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="max-w-[480px] w-full h-[48px] bg-[#FF7C6A] rounded-[10px] text-center text-white font-[pretendard] font-semibold cursor-pointer"
          >
            다음
          </button>
        </div>
      </div>
      {modalOpen && <Modal modalText={modalText} onClose={handleModalClose} />}
    </div>
  );
}
