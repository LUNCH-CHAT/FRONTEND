import { useNavigate } from 'react-router-dom';
import Back from '@/assets/back.svg';
import BasicProfile from '@/assets/basic-profile.png';
import React from 'react';

interface ChatHeaderProps {
  name: string;
  friendInfo: string;
}

const ChatHeader = ({ name, friendInfo }: ChatHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="w-full max-w-[480px] flex gap-1 px-5 pt-5 fixed top-0 select-none bg-[#ffffff]">
      <button type="button" className="cursor-pointer" onClick={handleBack}>
        <img src={Back} alt="뒤로가기" />
      </button>
      <img
        src={BasicProfile}
        alt={`${name}님의 프로필`}
        className="w-[35px] h-[35px] rounded-full object-cover mt-1 ml-2"
      />
      <div>
        <p className="font-[pretendard] font-normal">{name}</p>
        <p className="font-[pretendard] font-normal text-[13px]">{friendInfo}</p>
      </div>
    </div>
  );
};

export default React.memo(ChatHeader);
