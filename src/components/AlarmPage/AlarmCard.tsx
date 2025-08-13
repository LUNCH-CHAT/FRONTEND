import BasicProfile from '@/assets/basic-profile.png';
import { useNavigate } from 'react-router-dom';

interface AlarmCardProps {
  image?: string;
  sender: string;
  content: string;
  time: string;
}

const AlarmCard = ({ image, sender, content, time }: AlarmCardProps) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/matching', {
      state: {
        selectTab: 'matched',
      },
    });
  };

  return (
    <div className="flex gap-3 m-4 cursor-pointer" onClick={handleNavigate}>
      <img
        src={image ? import.meta.env.VITE_API_URL + image : BasicProfile}
        // onError={() => console.log('이미지 로드 실패:', import.meta.env.VITE_API_URL + image)}
        alt={`${sender}님의 프로필`}
        className="w-[35px] h-[35px] rounded-full object-cover mt-1"
      />
      <div className="select-none">
        <h2 className="font-[pretendard] font-bold text-[#F56156]">런치챗 요청 알림</h2>
        <p className="font-[pretendard] font-normal">{content}</p>
        <time className="font-[pretendard] font-normal text-[#B6B6B6]">{time}</time>
      </div>
    </div>
  );
};

export default AlarmCard;
