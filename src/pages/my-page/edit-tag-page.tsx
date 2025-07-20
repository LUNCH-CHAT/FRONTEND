import { useNavigate } from "react-router-dom";
import TagSelectList from "../../components/TagSelect/TagSelectList";

export default function EditTagPage() {
    const navigate = useNavigate();

    return(
        <>
            <div className="px-[20px]">
                <p className="text-black text-[22px] font-[pretendard] font-semibold mt-11 mb-[4px]">
                    관심사 태그 수정
                </p>
                <p className="text-[#FF7C6A] text-[13px] font-[pretendard] font-medium mb-[40px]">
                    최대 3개까지 선택 가능합니다.
                </p>
                <TagSelectList />
            </div>
            <div className="fixed w-full max-w-[480px] bottom-0 px-5 pb-4">
                <button
                    type="button"
                    onClick={() => {
                        navigate(`/my/profile`);
                    }}
                    className="w-full h-[48px] bg-[#FF7C6A] rounded-[10px] text-center text-white font-[pretendard] font-semibold cursor-pointer"
                >
                    수정완료
                </button>
            </div>
        </>
    )
}