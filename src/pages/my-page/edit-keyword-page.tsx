import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patchKeywords } from "../../api/my";
import type { MyKeywords } from "../../types/user";

export default function EditKeywordPage() {
    const navigate = useNavigate();
    const [expressTitle, setExpressTitle] = useState('');
    const [expressDescription, setExpressDescription] = useState('');
    const [goalTitle, setGoalTitle] = useState('');
    const [goalDescription, setGoalDescription] = useState('');
    const [interestTitle, setInterestTitle] = useState('');
    const [interestDescription, setInterestDescription] = useState('');

    const handleFinish = async () => {
        const body: MyKeywords = {
            "keywords": [
            {
                "type": "EXPRESS",
                "title": expressTitle,
                "description": expressDescription
            },
            {
                "type": "GOAL",
                "title": goalTitle,
                "description": goalDescription
            },
            {
                "type": "INTEREST",
                "title": interestTitle,
                "description": interestDescription
            }
          ]
        }
        try {
            await patchKeywords(body);
            console.log(body);
            navigate(`/my/profile`);
        } catch (error) {
            console.log('실패');
        }
    };  

    return(
        <>
        <div className="px-[20px]">
            <p className="text-black text-[22px] font-[pretendard] font-semibold mb-[19px]">
                키워드 소개 수정
            </p>
            <div className="mb-[41px]">
                <p className="text-[#FF7C6A] text-[13px] font-[pretendard] font-medium mb-[4px]">
                    지금 나를 표현한 키워드는?
                </p>
                <input
                    type="text"
                    placeholder="키워드는 최대 5자(공백 포함)"
                    onChange={(e) => setExpressTitle(e.target.value)}
                    className="h-[36px] w-full px-[14px] py-[8px] rounded-[10px] border border-[#B6B6B6] text-[13px] font-[pretendard] font-medium leading-[20px] cursor-pointer focus:border-[#FF7C6A] focus:outline-none"
                />
                <p className="text-[#7D7D7D] text-[13px] font-[pretendard] font-medium mt-[10px] mb-[3px]">
                    상세 설명
                </p>
                <textarea
                    placeholder="상세 설명은 최대 100자(공백 포함)"
                    onChange={(e) => setExpressDescription(e.target.value)}
                    className="h-[101px] w-full px-[13px] py-[12px] rounded-[10px] border border-[#B6B6B6] text-[13px] font-[pretendard] font-medium leading-[150%] cursor-pointer resize-none focus:border-[#FF7C6A] focus:outline-none"
                />
            </div>
            <div className="mb-[41px]">
                <p className="text-[#FF7C6A] text-[13px] font-[pretendard] font-medium mb-[4px]">
                    요즘 나의 목표 키워드는?
                </p>
                <input
                    type="text"
                    placeholder="키워드는 최대 5자(공백 포함)"
                    onChange={(e) => setGoalTitle(e.target.value)}
                    className="h-[36px] w-full px-[14px] py-[8px] rounded-[10px] border border-[#B6B6B6] text-[13px] font-[pretendard] font-medium leading-[20px] cursor-pointer focus:border-[#FF7C6A] focus:outline-none"
                />
                <p className="text-[#7D7D7D] text-[13px] font-[pretendard] font-medium mt-[10px] mb-[3px]">
                    상세 설명
                </p>
                <textarea
                    placeholder="상세 설명은 최대 100자(공백 포함)"
                    onChange={(e) => setGoalDescription(e.target.value)}
                    className="h-[101px] w-full px-[13px] py-[12px] rounded-[10px] border border-[#B6B6B6] text-[13px] font-[pretendard] font-medium leading-[150%] cursor-pointer resize-none focus:border-[#FF7C6A] focus:outline-none"
                />
            </div>
            <div className="mb-[94px]">
                <p className="text-[#FF7C6A] text-[13px] font-[pretendard] font-medium mb-[4px]">
                    요즘 나의 최대 관심사 키워드는?
                </p>
                <input
                    type="text"
                    placeholder="키워드는 최대 5자(공백 포함)"
                    onChange={(e) => setInterestTitle(e.target.value)}
                    className="h-[36px] w-full px-[14px] py-[8px] rounded-[10px] border border-[#B6B6B6] text-[13px] font-[pretendard] font-medium leading-[20px] cursor-pointer focus:border-[#FF7C6A] focus:outline-none"
                />
                <p className="text-[#7D7D7D] text-[13px] font-[pretendard] font-medium mt-[10px] mb-[3px]">
                    상세 설명
                </p>
                <textarea
                    placeholder="상세 설명은 최대 100자(공백 포함)"
                    onChange={(e) => setInterestDescription(e.target.value)}
                    className="h-[101px] w-full px-[13px] py-[12px] rounded-[10px] border border-[#B6B6B6] text-[13px] font-[pretendard] font-medium leading-[150%] cursor-pointer resize-none focus:border-[#FF7C6A] focus:outline-none"
                />
            </div>
        </div>
        <div className="fixed w-full max-w-[480px] bottom-0 px-5 pb-4 pt-[10px] bg-white border-t border-gray-200">
            <button
                type="button"
                onClick={handleFinish}
                className="w-full h-[48px] bg-[#FF7C6A] rounded-[10px] text-center text-white font-[pretendard] font-semibold cursor-pointer"
            >
                수정완료
            </button>
        </div>
        </>
    )
}