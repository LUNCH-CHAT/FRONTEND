import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileCompletePage() {
  const navigate = useNavigate();
  const [fadeout,setFadeOut]=useState(false);

  useEffect(() => {
    setTimeout(() => {
      setFadeOut(true);
    },2000);

    setTimeout(() => {
      navigate(`/`);
    },3000); {/* 300으로 해야 하는데 너무 빠른 것 같아서 일단 3000으로 둠 */}
  },[])

  return (
    <div className={`min-h-screen flex flex-col justify-center px-[65px] text-center text-white font-[pretendard] bg-gradient-to-b from-[#FFECEB] via-[#FF9B8E] to-[#FF7C6A] 
      transition-opacity duration-1000 ${fadeout ? "opacity-0" : "opacity-100"}`}>
      <p className="text-[22px] font-bold mb-[31px]">유엠씨님, 환영합니다!</p>
      <h1 className="text-[20px] font-medium mb-[27px]">Lunch with Insight!</h1>
      <p className="text-[16px] font-medium">
        혼자 먹는 점심, 텅 빈 강의 시간…<br/>
        이제는 비슷한 관심사를 가진 친구 혹은<br/>
        선배와 가볍게 이야기를 나눠요!
      </p>
    </div>
  );
}
