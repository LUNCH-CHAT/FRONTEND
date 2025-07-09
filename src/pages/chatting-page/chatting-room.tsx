import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ChatMessages from '../../components/ChattingPage/ChatMessages';
import ChatHeader from '../../components/ChattingPage/ChatHeader';
import ChatInput from '../../components/ChattingPage/ChatInput';

const mockMessages = [
  {
    id: 1,
    sender: '유엠씨',
    profile: null,
    text: '안녕하세요!',
    timestamp: 1750001400000,
  },
  {
    id: 2,
    sender: null,
    profile: null,
    text: '안녕하세요~',
    timestamp: 1750001400000,
  },
  {
    id: 3,
    sender: null,
    profile: null,
    text: '내일 점심시간 맞죠?',
    timestamp: 1750001460000,
  },
  {
    id: 4,
    sender: '유엠씨',
    profile: null,
    text: '네 맞습니다.',
    timestamp: 1750001460000,
  },
  {
    id: 5,
    sender: '유엠씨',
    profile: null,
    text: '그럼 12시에 봬요.',
    timestamp: 1750001460000,
  },
  {
    id: 6,
    sender: null,
    profile: null,
    text: '넵 알겠습니다!',
    timestamp: 1750087800000,
  },
];

export default function ChattingRoom() {
  const { id } = useParams();
  console.log(id);

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<
    {
      id: number;
      sender: string | null;
      profile: string | null;
      text: string;
      timestamp: number;
    }[]
  >([]);

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  const handleSendMessage = () => {
    console.log(message);
    setMessage('');
  };

  return (
    <>
      {/* 헤더 */}
      <ChatHeader />
      {/* 대화 내용 */}
      <ChatMessages messages={messages} />
      {/* 입력창 */}
      <ChatInput value={message} onChange={setMessage} onSubmit={handleSendMessage} />
    </>
  );
}
