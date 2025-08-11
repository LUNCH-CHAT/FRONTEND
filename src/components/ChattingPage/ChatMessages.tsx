import ChatBox from '../../components/ChattingPage/ChatBox';
import { formatDate, getDayOfWeek } from '../../utils/getDate';
import BasicProfile from '@/assets/basic-profile.png';
import type { ChatMessage } from '../../types/chat';
import React, { useMemo } from 'react';

interface ChatMessagesProps {
  userId: number;
  messages: ChatMessage[];
  senderName: string;
}

const ChatMessages = ({ userId, messages, senderName }: ChatMessagesProps) => {
  // 메시지 타임라인, 시간, 렌더링 여부 파악
  const formattedMessages = useMemo(() => {
    let prevDate = '';
    let prevSender: number | undefined = undefined;

    return messages?.map((msg, index) => {
      const { year, month, day, hours, minutes } = formatDate(msg.createdAt);
      const dayOfWeek = getDayOfWeek(msg.createdAt);
      const date = `${year}년 ${month}월 ${day}일 (${dayOfWeek})`;
      const time = `${hours}:${minutes}`;

      const showDate = date !== prevDate;
      const showProfile = msg.senderId !== prevSender;

      // 다음 메시지 시간과 비교해 현재 메시지에 time을 렌더링할지 결정
      const nextMsg = messages[index + 1];
      let showTime = true;

      if (nextMsg) {
        const { hours: nextHours, minutes: nextMinutes } = formatDate(nextMsg.createdAt);
        const nextTime = `${nextHours}:${nextMinutes}`;

        const sameTime = time === nextTime;
        const sameSender = msg.senderId === nextMsg.senderId;
        if (sameTime && sameSender) {
          showTime = false; // 다음 메시지에 시간 렌더링할 예정이므로 지금은 안 함
        }
      }

      // 이전  date와 sender를 기억
      prevDate = date;
      prevSender = msg.senderId;

      return { ...msg, date, time, showDate, showProfile: !!showProfile, showTime };
    });
  }, [messages]);

  return (
    <>
      {formattedMessages?.map(msg => (
        <ChatBox
          key={msg.id}
          userId={userId}
          senderId={msg.senderId}
          senderName={senderName}
          text={msg.content}
          time={msg.time}
          profile={BasicProfile}
          showProfile={msg.showProfile}
          showTime={msg.showTime}
        />
      ))}
    </>
  );
};

export default React.memo(ChatMessages);
