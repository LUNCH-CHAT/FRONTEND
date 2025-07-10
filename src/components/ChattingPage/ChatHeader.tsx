import { useNavigate } from 'react-router-dom';
import Back from '@/assets/back.svg';
import BasicProfile from '@/assets/basic-profile.png';

// interface ChatHeaderProps {
//   image?: string;
//   name: string;
//   major: string;
// }

const ChatHeader = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex gap-1 px-4 p-7 fixed top-0 select-none">
      <button type="button" className="cursor-pointer" onClick={handleBack}>
        <img src={Back} alt="뒤로가기" />
      </button>
      <img
        src={BasicProfile}
        alt={`${name}님의 프로필`}
        className="w-[35px] h-[35px] rounded-full object-cover mt-1 ml-2"
      />
      <div>
        <p className="font-[pretendard] font-normal">유엠씨</p>
        <p className="font-[pretendard] font-normal text-[13px]">컴퓨터공학과</p>
      </div>
    </div>
  );
};

export default ChatHeader;
