import { useNavigate } from 'react-router-dom';
import Back from '@/assets/back.svg';
import BasicProfile from '@/assets/basic-profile.png';
import React from 'react';

interface ChatHeaderProps {
  id: number | undefined;
  name: string;
  friendInfo: string;
}

const ChatHeader = ({ id, name, friendInfo }: ChatHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/chatting');
  };

  const handleClickProfile = (memberId: number | undefined) => {
    if (id) {
      navigate(`/profile/${memberId}`);
    }
  };

  return (
    <div className="w-full max-w-[480px] h-[64px] flex items-center gap-1 px-5 fixed top-0 select-none bg-[#ffffff]">
      <button type="button" className="cursor-pointer" onClick={handleBack}>
        <img src={Back} alt="뒤로가기" />
      </button>
      <div
        className={`flex items-center gap-1 ${id ? 'cursor-pointer' : ''}`}
        onClick={() => handleClickProfile(id)}
      >
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
    </div>
  );
};

export default React.memo(ChatHeader);
