import { useEffect, useState } from 'react';
import TimeTable from '../../components/TimeTable';
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
import type { TimeTable as TimeTableType} from '../../types/user';
import { getColleges, getDepartments, patchSignUp } from '../../api/login-page/login';
import { useNavigate } from 'react-router-dom';

export default function ProfileStepPage() {
  const [step, setStep] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [studentNo, setStudentNo] = useState('');
  const [college, setCollege] = useState<{id:number; name:string}[]>();
  const [collegeId, setCollegeId] = useState(0);
  const [department, setDepartment] = useState<{id:number; name:string}[]>();
  const [departmentId, setDepartmentId] = useState(0);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [timeTables, setTimeTables] = useState<TimeTableType[]>([]);
  const navigate = useNavigate();

  setTimeTables([
    {
      dayOfWeek: "MON",
      startTime: "09:00",
      endTime: "10:00",
      subjectName: ""
    }
  ])
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
  
  const modalText =
    '런치챗은 교내 자기계발을 위한\n관심사 기반 밥약/커피챗 플랫폼입니다.\n건강한 소통 문화를 위해\n실명제로 운영됩니다.';

  const handleModalClose = () => {
    setModalOpen(false);
  };

  {/*단과대 불러오기*/}
  useEffect(()=>{
    (async () => {
      try {
        const data = await getColleges();
        setCollege(data.result);
      }catch(error){
        console.log('실패');
      }
    })();
  },[]);

  {/*학과 불러오기*/}
  useEffect(()=>{
    (async () => {
      try {
        const data = await getDepartments(collegeId);
        setDepartment(data.result);
      }catch(error){
        console.log('실패');
      }
    })();
  },[collegeId]);

  {/*회원가입 정보 패치*/}
  useEffect(() => {
    if (step === 5) {
      const body = {
        membername: name, 
        studentNo: studentNo, 
        collegeId: collegeId, 
        departmentId: departmentId, 
        interests: selectedTags, 
        timeTables: timeTables
      };
      console.log(body);
      (async () => {
        try{
          await patchSignUp(body);
          navigate(`/onboarding/complete`);
        }catch(error) {
          console.log('실패');
        }
      })();
    }
  },[step]);

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
              placeholder="이름을 입력하세요"
              onChange={(e) => setName(e.target.value)}
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
              placeholder="ex) 25"
              onChange={(e) => setStudentNo(e.target.value)}
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
              <Listbox value={collegeId} onChange={setCollegeId}>
                <div className="relative w-full">
                  <ListboxButton
                    className={`w-full pb-1 border-b border-[#7D7D7D] text-left focus:border-[#FF7C6A] text-[16px] font-[pretendard] font-medium 
                    ${collegeId ? 'text-black' : 'text-[#B6B6B6]'}`}
                  >
                    <div className="flex justify-between items-center">
                      {college?.find((item) => item.id === collegeId)?.name || '단과대 선택'}
                      <img src={DropDown} alt="드롭다운" className="size-3 cursor-pointer" />
                    </div>
                  </ListboxButton>

                  {/* 옵션 */}
                  <ListboxOptions className="absolute right-0 w-[127px] px-[11px] py-[10px] border border-[#D4D4D4] mt-1 flex flex-col gap-3">
                    {college?.map((college) => (
                      <ListboxOption
                        key={college.id}
                        value={college.id}
                        className="select-none text-4 font-[pretendard] font-regular leading-4"
                      >
                        {college.name}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>

              <Listbox value={departmentId} onChange={setDepartmentId}>
                <div className="relative w-full">
                  <ListboxButton
                    className={`w-full pb-1 border-b border-[#7D7D7D] text-left focus:border-[#FF7C6A] text-[16px] font-[pretendard] font-medium 
                    ${departmentId ? 'text-black' : 'text-[#B6B6B6]'}`}
                  >
                    <div className="flex justify-between items-center">
                      {department?.find((item) => item.id === departmentId)?.name || '학과 선택'}
                      <img src={DropDown} alt="드롭다운" className="size-3 cursor-pointer" />
                    </div>
                  </ListboxButton>

                  {/* 옵션 */}
                  <ListboxOptions className="absolute right-0 w-[127px] px-[11px] py-[10px] border border-[#D4D4D4] mt-1 flex flex-col gap-3">
                    {department?.map((value) => (
                      <ListboxOption
                        key={value.id}
                        value={value.id}
                        className="select-none text-4 font-[pretendard] font-regular leading-4"
                      >
                        {value.name}
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
              <TagSelectList selected={selectedTags} onChange={setSelectedTags}/>
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="flex flex-col items-center px-[20px]">
            <p className="text-black text-[22px] font-[pretendard] font-semibold mt-[50px] mb-[10px] text-center">
              <span className="text-[#FF7C6A] font-bold">런치챗이 가능한 시간대</span>를<br />
              선택해주세요
            </p>
            <TimeTable isEditable={true} />
          </div>
        )}
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
