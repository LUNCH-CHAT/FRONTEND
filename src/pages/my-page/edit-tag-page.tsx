import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TagSelectList from "../../components/TagSelect/TagSelectList";
import { patchTags } from "../../api/my";
import { INTEREST_TYPE_LABELS } from "../../components/ProfileCard";

export default function EditTagPage() {
    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    const handleFinish = async() => {
        const keys= Object.keys(INTEREST_TYPE_LABELS);
        const tags= selectedTags.map((tag)=>keys.indexOf(tag)+1);
        const body={"interestIds": tags};
        try {
            await patchTags(body);
            console.log(body);
            navigate(`/my/profile`);
        } catch (error) {
            console.log('태그 불러오기 실패', error);
        }
    }

    return(
        <>
            <div className="px-[20px]">
                <p className="text-black text-[22px] font-[pretendard] font-semibold mt-11 mb-[4px]">
                    관심사 태그 수정
                </p>
                <p className="text-[#F56156] text-[13px] font-[pretendard] font-medium mb-[40px]">
                    최대 3개까지 선택 가능합니다.
                </p>
                <TagSelectList selected={selectedTags} onChange={setSelectedTags}/>
            </div>
            <div className="fixed w-full max-w-[480px] bottom-0 px-5 pb-4">
                <button
                    type="button"
                    onClick={handleFinish}
                    className="w-full h-[48px] bg-[#F56156] rounded-[10px] text-center text-white font-[pretendard] font-semibold cursor-pointer"
                >
                    수정완료
                </button>
            </div>
        </>
    )
}