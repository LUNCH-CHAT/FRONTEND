import { useNavigate } from "react-router-dom";
import TimeTable from "../../components/TimeTable";
import type { TimeTable as TimeTableType } from "../../types/user";
import { useState } from "react";
import { patchTimeTables } from "../../api/my";

export default function EditTimePage() {
    const navigate = useNavigate();
    const [timeTables, setTimeTables] = useState<TimeTableType[]>([]);
    
    const handleFinish = async() => {
        const body={"timeTableList": timeTables};
        try {
            await patchTimeTables(body);
            console.log(body);
            navigate(`/my/profile`);
        } catch (error) {
            console.log('실패');
        }
    }

    return(
        <>
            <div className="flex flex-col items-center px-[46.5px]">
                <p className="text-black text-[20px] font-[pretendard] font-semibold leading-[30px] mb-[44px] text-center px-[20px]">
                    <span className="text-[#FF7C6A] font-bold">런치챗이 가능한 시간대</span>를<br/>선택해주세요
                </p>   
                <div className="flex justify-center items-center max-w-[380px] ">
                    <TimeTable isEditable={true} onChange={setTimeTables}/>
                </div>
            </div>
            <div className="fixed w-full max-w-[480px] bottom-0 px-5 pb-4">
                <button
                    type="button"
                    onClick={handleFinish}
                    className="w-full h-[48px] bg-[#FF7C6A] rounded-[10px] text-center text-white font-[pretendard] font-semibold cursor-pointer"
                >
                    수정 완료
                </button>
            </div>
        </>
    )
}