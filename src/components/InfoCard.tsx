// src/components/InfoCard.tsx
import React from 'react';

interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  description?: string;
  onClick?: () => void;
}

export default function InfoCard({
  title,
  icon,
  description,
  onClick,
}: InfoCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex flex-col w-full items-start 
        font-[pretendard] focus:outline-none
      "
    >
      
      <div
        className="
          bg-white w-full
          py-[35px] px-[29px]
          rounded-[10px] shadow-sm overflow-hidden
          flex justify-center
        "
      >
        {icon}
      </div>

      
      <h3 className="mt-[4px] text-[16px] font-medium leading-[22px] text-black">
        {title}
      </h3>

      {description && (
        <p className="mt-[4px] text-[14px] text-gray-500 leading-[20px] text-center">
          {description}
        </p>
      )}
    </button>
  );
}
