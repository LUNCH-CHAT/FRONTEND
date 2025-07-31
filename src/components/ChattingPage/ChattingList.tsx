import BasicProfile from '@/assets/basic-profile.png';
import { useNavigate } from 'react-router-dom';

interface ChattingListProps {
  id: number;
  image?: string;
  name: string;
  friendInfo: string;
  lastMessage?: string;
  time?: string;
}

const ChattingList = ({ id, image, name, friendInfo, lastMessage, time }: ChattingListProps) => {
  const navigate = useNavigate();

  const handleEnterRoom = () => {
    navigate(`/chatting/${id}`, {
      state: {
        name,
        friendInfo,
      },
    });
  };

  return (
    <div
      className="flex gap-3 px-4 h-[50px] justify-between cursor-pointer"
      onClick={handleEnterRoom}
    >
      <div className="flex gap-3 items-center">
        <img
          src={image ? image : BasicProfile}
          alt={`${name}님의 프로필`}
          className="w-12 h-12 rounded-full object-cover mt-1"
        />
        <div>
          <p className="font-[pretendard] font-medium">{name}</p>
          <p className="font-[pretendard] font-normal text-[#B6B6B6] text-[13px] line-clamp-1 overflow-hidden text-ellipsis">
            {lastMessage}
          </p>
        </div>
      </div>
      <time className="font-[pretendard] font-normal text-[#B6B6B6] text-[13px] whitespace-nowrap pt-6 self-center">
        {time}
      </time>
    </div>
  );
};

export default ChattingList;
