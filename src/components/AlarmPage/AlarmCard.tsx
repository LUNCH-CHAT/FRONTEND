import BasicProfile from '@/assets/basic-profile.png';

interface AlarmCardProps {
  image?: string;
  sender: string;
  type: string;
  time: string;
}

const AlarmCard = ({ image, sender, type, time }: AlarmCardProps) => {
  return (
    <div className="flex gap-3 p-4">
      <img
        src={image ? image : BasicProfile}
        alt={`${sender}님의 프로필`}
        className="w-[35px] h-[35px] rounded-full object-cover mt-1"
      />
      <div className="select-none">
        <h2 className="font-[pretendard] font-bold">런치챗 요청 알림</h2>
        <p className="font-[pretendard] font-normal">
          {sender}님이 런치챗을 {type}했어요!
        </p>
        <time className="font-[pretendard] font-normal text-[#B6B6B6]">{time}</time>
      </div>
    </div>
  );
};

export default AlarmCard;
