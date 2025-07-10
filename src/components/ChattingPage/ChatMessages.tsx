import React from 'react';
import ChatBox from '../../components/ChattingPage/ChatBox';
import { formatDate, getDayOfWeek } from '../../utils/getDate';
import BasicProfile from '@/assets/basic-profile.png';

interface ChatMessagesProps {
  messages: {
    id: number;
    sender: string | null;
    profile: string | null;
    text: string;
    timestamp: number;
  }[];
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  let prevDate = '';
  let prevSender: string | null = null;

  return (
    <div className="pt-2">
      {messages?.map((msg, index) => {
        const { year, month, day, hours, minutes } = formatDate(msg.timestamp);
        const dayOfWeek = getDayOfWeek(msg.timestamp);
        const date = `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
        const time = `${hours}:${minutes}`;

        const showDate = date !== prevDate;
        const showProfile = msg.sender && (msg.sender !== prevSender || index === 0);
        // 다음 메시지 시간과 비교해 현재 메시지에 time을 렌더링할지 결정
        const nextMsg = messages[index + 1];
        let showTime = true;
        if (nextMsg) {
          const { hours: nextHours, minutes: nextMinutes } = formatDate(nextMsg.timestamp);
          const nextTime = `${nextHours}:${nextMinutes}`;

          const sameTime = time === nextTime;
          const sameSender = msg.sender === nextMsg.sender;
          if (sameTime && sameSender) {
            showTime = false; // 다음 메시지에 시간 렌더링할 예정이므로 지금은 안 함
          }
        }

        // 이전  date와 sender를 기억
        prevDate = date;
        prevSender = msg.sender;

        return (
          <div key={msg.id}>
            {showDate && (
              <time className="font-[pretendard] font-normal text-[12px] text-[#A3A3A3] flex justify-center">
                {date}
              </time>
            )}
            <ChatBox
              sender={msg.sender ?? undefined}
              text={msg.text}
              time={time}
              profile={BasicProfile}
              showProfile={!!showProfile}
              showTime={showTime}
            />
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(ChatMessages);
