import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getKeywords, patchKeywords, postKeywordAI } from "../../api/my";
import type { MyKeywords } from "../../types/user";
import Modal from "../../components/Modal";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export default function EditKeywordPage() {
    const navigate = useNavigate();
    const [expressTitle, setExpressTitle] = useState('');
    const [expressDescription, setExpressDescription] = useState('');
    const [goalTitle, setGoalTitle] = useState('');
    const [goalDescription, setGoalDescription] = useState('');
    const [interestTitle, setInterestTitle] = useState('');
    const [interestDescription, setInterestDescription] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalText, setModalText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
          try {
            const data = await getKeywords();
            console.log('키워드데이터:',data);
            if (data.result){
                setExpressTitle(data.result[0]?.title);
                setExpressDescription(data.result[0]?.description);
                setGoalTitle(data.result[1]?.title);
                setGoalDescription(data.result[1]?.description);
                setInterestTitle(data.result[2]?.title);
                setInterestDescription(data.result[2]?.description);
            } 
          } catch (error) {
            console.log('키워드 불러오기 실패', error);
          } finally {
            setIsLoading(false);
          }
        })();
    },[]);

    const handleModalClose = () => {
        setModalOpen(false);
    };

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
            if ((expressTitle.length > 5) || (goalTitle.length > 5) || (interestTitle.length > 5))
                setModalText("키워드는 최대 5글자(공백 포함)");
            else if ((expressDescription.length > 100) || (goalDescription.length > 100) || (interestDescription.length >100))
                setModalText("상세설명은 최대 100글자(공백 포함)");
            setModalOpen(true);

            console.log('키워드 불러오기 실패', error);
        }
    };  

const handleKeyword = async (title:string) => {
    if (title === 'express'){
        try {
            const data = await postKeywordAI(expressDescription);
            console.log('ai키워드:'+data.result.keyword);
            setExpressTitle(data.result.keyword);
        } catch (error) {
            setModalOpen(true);
            const err = error as any;
            setModalText(err.response.data.result.description);
            console.log('AI키워드 불러오기 실패', error);
        }
    }
    if (title === 'goal'){
        try {
            const data = await postKeywordAI(goalDescription);
            console.log('ai키워드:'+data.result.keyword);
            setGoalTitle(data.result.keyword);
        } catch (error) {
            setModalOpen(true);
            const err = error as any;
            setModalText(err.response.data.result.description);
            console.log('AI키워드 불러오기 실패', error);
        }
    }
    if (title === 'interest'){
        try {
            const data = await postKeywordAI(interestDescription);
            console.log('ai키워드:'+data.result.keyword);
            setInterestTitle(data.result.keyword);
        } catch (error) {
            setModalOpen(true);
            const err = error as any;
            setModalText(err.response.data.result.description);
            console.log('AI키워드 불러오기 실패', error);
        }
    }
}

    return(
        <>
        {isLoading && <LoadingSpinner />}
        {modalOpen && <Modal modalText={modalText} onClose={handleModalClose} />}
        <div className="px-[20px]">
            <p className="text-black text-[22px] font-[pretendard] font-semibold mb-[19px]">
                키워드 소개 수정
            </p>
            <div className="mb-[41px]">
                <p className="text-[#F56156] text-[13px] font-[pretendard] font-medium mb-[4px]">
                    지금 나를 표현한 키워드는?
                </p>
                <input
                    type="text"
                    placeholder="키워드는 최대 5자(공백 포함)"
                    value={expressTitle}
                    onChange={(e) => setExpressTitle(e.target.value)}
                    className="h-[36px] w-full px-[14px] py-[8px] rounded-[10px] border border-[#B6B6B6] text-[13px] font-[pretendard] font-medium leading-[20px] cursor-pointer focus:border-[#F56156] focus:outline-none"
                />
                <p className="text-[#7D7D7D] text-[13px] font-[pretendard] font-medium mt-[10px] mb-[3px]">
                    상세 설명
                </p>
                <textarea
                    placeholder="상세 설명은 최대 100자(공백 포함)"
                    value={expressDescription}
                    onChange={(e) => setExpressDescription(e.target.value)}
                    className="h-[101px] w-full px-[13px] py-[12px] rounded-[10px] border border-[#B6B6B6] text-[13px] font-[pretendard] font-medium leading-[150%] cursor-pointer resize-none focus:border-[#F56156] focus:outline-none"
                />

                {/*AI 키워드 생성*/}
                <div className="flex gap-3 mt-[10px] font-[pretendard]">
                    <button 
                        onClick={()=>handleKeyword('express')}
                        className="bg-[#FF8D7D] text-white text-[13px] font-semibold px-[14px] py-[6px] rounded-[10px] cursor-pointer">AI 키워드 생성</button>
                    <div className="text-[10px] font-medium">
                        <p className="text-[#F56156]">AI 키워드 생성이란?</p>
                        <p className="text-[#A0A0A0]">입력한 상세 설명을 기반으로 AI가 적합한 키워드 추천</p>
                    </div>
                </div>

            </div>

            <div className="mb-[41px]">
                <p className="text-[#F56156] text-[13px] font-[pretendard] font-medium mb-[4px]">
                    요즘 나의 목표 키워드는?
                </p>
                <input
                    type="text"
                    placeholder="키워드는 최대 5자(공백 포함)"
                    value={goalTitle}
                    onChange={(e) => setGoalTitle(e.target.value)}
                    className="h-[36px] w-full px-[14px] py-[8px] rounded-[10px] border border-[#B6B6B6] text-[13px] font-[pretendard] font-medium leading-[20px] cursor-pointer focus:border-[#F56156] focus:outline-none"
                />
                <p className="text-[#7D7D7D] text-[13px] font-[pretendard] font-medium mt-[10px] mb-[3px]">
                    상세 설명
                </p>
                <textarea
                    placeholder="상세 설명은 최대 100자(공백 포함)"
                    value={goalDescription}
                    onChange={(e) => setGoalDescription(e.target.value)}
                    className="h-[101px] w-full px-[13px] py-[12px] rounded-[10px] border border-[#B6B6B6] text-[13px] font-[pretendard] font-medium leading-[150%] cursor-pointer resize-none focus:border-[#F56156] focus:outline-none"
                />

                {/*AI 키워드 생성*/}
                <div className="flex gap-3 mt-[10px] font-[pretendard]">
                    <button
                        onClick={() => handleKeyword('goal')} 
                        className="bg-[#FF8D7D] text-white text-[13px] font-semibold px-[14px] py-[6px] rounded-[10px] cursor-pointer">AI 키워드 생성</button>
                    <div className="text-[10px] font-medium">
                        <p className="text-[#F56156]">AI 키워드 생성이란?</p>
                        <p className="text-[#A0A0A0]">입력한 상세 설명을 기반으로 AI가 적합한 키워드 추천</p>
                    </div>
                </div>

            </div>

            <div className="mb-20">
                <p className="text-[#F56156] text-[13px] font-[pretendard] font-medium mb-[4px]">
                    요즘 나의 최대 관심사 키워드는?
                </p>
                <input
                    type="text"
                    placeholder="키워드는 최대 5자(공백 포함)"
                    value={interestTitle}
                    onChange={(e) => setInterestTitle(e.target.value)}
                    className="h-[36px] w-full px-[14px] py-[8px] rounded-[10px] border border-[#B6B6B6] text-[13px] font-[pretendard] font-medium leading-[20px] cursor-pointer focus:border-[#F56156] focus:outline-none"
                />
                <p className="text-[#7D7D7D] text-[13px] font-[pretendard] font-medium mt-[10px] mb-[3px]">
                    상세 설명
                </p>
                <textarea
                    placeholder="상세 설명은 최대 100자(공백 포함)"
                    value={interestDescription}
                    onChange={(e) => setInterestDescription(e.target.value)}
                    className="h-[101px] w-full px-[13px] py-[12px] rounded-[10px] border border-[#B6B6B6] text-[13px] font-[pretendard] font-medium leading-[150%] cursor-pointer resize-none focus:border-[#F56156] focus:outline-none"
                />

                {/*AI 키워드 생성*/}
                <div className="flex gap-3 mt-[10px] font-[pretendard]">
                    <button 
                        onClick={()=>handleKeyword('interest')}
                        className="bg-[#FF8D7D] text-white text-[13px] font-semibold px-[14px] py-[6px] rounded-[10px] cursor-pointer">AI 키워드 생성</button>
                    <div className="text-[10px] font-medium">
                        <p className="text-[#F56156]">AI 키워드 생성이란?</p>
                        <p className="text-[#A0A0A0]">입력한 상세 설명을 기반으로 AI가 적합한 키워드 추천</p>
                    </div>
                </div>

            </div>

        </div>
        <div className="fixed w-full max-w-[480px] bottom-0 px-5 pb-4 pt-[10px] bg-white border-t border-gray-200">
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