import BasicProfile from '@/assets/basic-profile.png';
import { useNavigate } from 'react-router-dom';
import useLongPress from '../../hooks/chat/useLongPress';

interface ChattingListProps {
  id: number;
  name: string;
  friendInfo: string;
  friendImage: string;
  lastMessage?: string;
  time?: string;
  onLongPress: () => void;
}

const ChattingList = ({
  id,
  name,
  friendInfo,
  friendImage,
  lastMessage,
  time,
  onLongPress,
}: ChattingListProps) => {
  const navigate = useNavigate();

  const longPress = useLongPress({ onLongPress });

  const handleEnterRoom = () => {
    navigate(`/chatting/${id}`, {
      state: {
        name,
        friendInfo,
        friendImage,
      },
    });
  };

  return (
    <>
      <div
        className="flex gap-3 px-4 h-[60px] justify-between cursor-pointer active:shadow-md active:rounded-md"
        onClick={handleEnterRoom}
        {...longPress} // 반환된 객체 스프레드
      >
        <div className="flex gap-3 items-center">
          <img
            src={friendImage ? friendImage : BasicProfile}
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
    </>
  );
};

export default ChattingList;
