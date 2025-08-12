import BasicProfile from '@/assets/basic-profile.png';
import React from 'react';

interface ChatBoxProps {
  userId: number;
  senderId: number;
  senderName: string;
  profile?: string;
  text: string;
  time: string;
  showProfile?: boolean;
  showTime?: boolean;
}

const ChatBox = ({
  userId,
  senderId,
  senderName,
  profile,
  text,
  time,
  showProfile = false,
  showTime = true,
}: ChatBoxProps) => {
  const isMine = senderId === userId;

  return (
    <div
      className={`flex gap-2 mb-2 font-[pretendard] font-normal px-5 ${
        isMine ? 'justify-end' : 'justify-start'
      }`}
    >
      {/* 상대방 프로필 */}
      {!isMine && showProfile ? (
        <img
          src={profile || BasicProfile}
          alt="프로필"
          className="w-[30px] h-[30px] rounded-full object-cover"
        />
      ) : !isMine ? (
        <div className="w-[30px]" /> // 자리 고정
      ) : null}

      {/* 메시지 내용 */}
      <div className="flex flex-col gap-1.5 max-w-[65%]">
        {/* 이름 */}
        {!isMine && showProfile && <p className="text-[13px]">{senderName}</p>}

        {/* 메시지 + 시간 */}
        <div className={`flex items-end gap-2 ${isMine ? 'justify-end' : ''}`}>
          {!isMine && (
            <>
              <div className="bg-[#F4F4F4] rounded-lg px-3 py-1 w-fit">{text}</div>
              {showTime && <time className="text-[#B6B6B6] text-[13px]">{time}</time>}
            </>
          )}
          {isMine && (
            <>
              {showTime && <time className="text-[#B6B6B6] text-[13px]">{time}</time>}
              <div className="bg-[#F56156] text-white rounded-lg px-3 py-1 w-fit">{text}</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChatBox);
