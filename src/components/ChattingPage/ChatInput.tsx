import type { Dispatch, SetStateAction } from 'react';
import Message from '@/assets/message.svg';
import React from 'react';

interface ChatInputProps {
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  onSubmit: () => void;
}

const ChatInput = ({ value, onChange, onSubmit }: ChatInputProps) => {
  return (
    <form
      className="max-w-[480px] w-full flex gap-2 px-5 py-5 fixed bottom-0 bg-[#ffffff]"
      onSubmit={e => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="MsgInput" className="sr-only">
        메시지 입력창
      </label>
      <input
        type="text"
        id="MsgInput"
        placeholder="채팅 입력창"
        className="w-full font-[pretendard] h-[36px] bg-[#F1F1F1] rounded-[20px] px-3 py-2.5"
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      <button
        type="submit"
        className="w-9 h-9 flex justify-center rounded-full bg-[#F1F1F1] disabled:cursor-not-allowed cursor-pointer"
        disabled={!value.trim()}
      >
        <img src={Message} alt="메시지 전송" className="px-1 py-2.5" />
      </button>
    </form>
  );
};

export default React.memo(ChatInput);
