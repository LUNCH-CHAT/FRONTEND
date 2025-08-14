import { useNavigate } from 'react-router-dom';
import RightArrow from '@/assets/icons/arrow-right.svg';
import ReceivedRequest from '@/assets/icons/received-request.svg';
import SentRequest from '@/assets/icons/sent-request.svg';
import TagSelect from '@/assets/icons/tag-select.svg';
import { useEffect, useState } from 'react';
import { getMyInfo } from '../../api/my';
import type { MyInfo } from '../../types/user';
import { INTEREST_TYPE_LABELS } from '../../components/ProfileCard';
import { postLogout } from '../../api/login';

export default function MyPage() {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState<MyInfo>();

  useEffect(() => {
    (async () => {
      try {
        const data = await getMyInfo();
        setMyInfo(data.result);
      } catch (error) {
        console.log('내 정보 불러오기 실패', error);
      }
    })();
  },[]);

  const handleLogout = async () => {
    try {
      const data = await postLogout();
      if (data.isSuccess) {
        localStorage.removeItem('accessToken');
        navigate('/onboarding');
      }
    } catch (error) {
      console.log('로그아웃 실패', error);
    }
  };

  const handleTabClick = (tab: string) => {
    navigate(`/matching?selectTab=${encodeURIComponent(tab)}`);
  };

  return (
    <div className="max-w-[480px] px-[20px]">
      <div className="flex gap-[16px]">
        <img
          src={myInfo?.profileImageUrl}
          alt="마이 프로필"
          className="size-[100px] rounded-full object-cover"
        />
        <div className="w-full">
          <div className="flex justify-between items-center w-full mb-[4px]">
            <p className="text-black text-[16px] font-[pretendard] font-semibold">{myInfo?.name}</p>
            <button
              type="button"
              onClick={() => navigate(`/my/profile`)}
              className="flex items-center gap-[5px] text-[#7D7D7D] text-[11px] font-[pretendard] font-regular cursor-pointer"
            >
              나의 프로필
              <img src={RightArrow} alt="나의 프로필 화살표" className="w-[5px] h-[9px]" />
            </button>
          </div>
          <p className="text-black text-[13px] font-[pretendard] font-regular mb-[6px]">
            {myInfo?.studentId}학번, {myInfo?.department}
          </p>
          <p className="text-[#7D7D7D] text-[13px] font-[pretendard] font-regular mb-[8px]">
            {myInfo?.keywords
              .filter((word) => word.trim() !=='')
              .map((word, idx, arr) => (
              <span key={idx}>
                {word}
                {idx !== arr.length - 1 && ' | '}
              </span>
            ))}
          </p>
          <div className="flex gap-[6px] flex-wrap">
            {myInfo?.tags.map((tag,idx)=>(
              <p 
                key={idx}
                className="inline-block px-[9px] py-[6px] border border-[#F56156] rounded-[15px] text-black text-[13px] font-[pretendard] font-light leading-[11px]">
                {INTEREST_TYPE_LABELS[tag]}
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full border border-[#D4D4D4] mt-[29px] rounded-[10px] flex justify-center items-center">
        <div className="flex w-[80%] justify-center items-center my-3">
          <button
            onClick={()=>{handleTabClick('RECIEVED')}}
            className="w-[60px] flex flex-col items-center cursor-pointer">
            <img src={ReceivedRequest} alt="받은 요청 이미지" className="size-[32px] mb-[6px]" />
            <p className="text-black text-[13px] font-[pretendard] font-medium mb-[2px]">{myInfo?.received}건</p>
            <p className="text-[#A0A0A0] text-[13px] font-[pretendard] font-regular">받은 요청</p>
          </button>
          <div className="w-full flex flex-1 justify-center items-center ">
            <div className="w-[1px] h-[45px] border border-[#D4D4D4]" />
          </div>
          <button
            onClick={()=>{handleTabClick('REQUESTED')}}
            className="w-[60px] flex flex-col items-center cursor-pointer">
            <img src={SentRequest} alt="보낸 요청 이미지" className="size-[32px] mb-[6px]" />
            <p className="text-black text-[13px] font-[pretendard] font-medium mb-[2px]">{myInfo?.requested}건</p>
            <p className="text-[#A0A0A0] text-[13px] font-[pretendard] font-regular">보낸 요청</p>
          </button>
          <div className="w-full flex flex-1 justify-center items-center ">
            <div className="w-[1px] h-[45px] border border-[#D4D4D4]" />
          </div>
          <button
            onClick={()=>{handleTabClick('ACCEPTED')}}
            className="w-[60px] flex flex-col items-center cursor-pointer">
            <img src={TagSelect} alt="매칭 완료 이미지" className="size-[32px] mb-[6px]" />
            <p className="text-black text-[13px] font-[pretendard] font-medium mb-[2px]">{myInfo?.completed}건</p>
            <p className="text-[#A0A0A0] text-[13px] font-[pretendard] font-regular">매칭 완료</p>
          </button>
        </div>
      </div>

      <button
        type="button"
        onClick={handleLogout}
        className="text-black text-[13px] font-[pretendard] font-medium mt-[19px] cursor-pointer"
      >
        로그아웃
      </button>
    </div>
  );
}
