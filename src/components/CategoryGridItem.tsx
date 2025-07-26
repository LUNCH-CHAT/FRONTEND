// src/components/CategoryGridItem.tsx

import React from 'react';

interface CategoryGridItemProps {
  icon: React.ReactNode;
  label: string;
  textClassName?: string;  // 폰트 크기 조절용 prop
  onClick?: () => void;
}

export default function CategoryGridItem({ icon, label, textClassName, onClick }: CategoryGridItemProps) {
  return (
    <div
      className="flex flex-col items-center w-full text-center cursor-pointer"
      onClick={onClick}
    >
      <div
        className="
          w-[39px] h-[34px]       /* 기본: 39px */
          xs:w-[54px] xs:h-[54px] /* ≥480px: 54px */
          flex items-center justify-center
          mb-2
        "
      >
        {icon}
      </div>
      <span
        className={
          `font-normal text-current font-pretendard ${textClassName ?? 'text-[11px] leading-[14px]'}`
        }
      >
        {label}
      </span>
    </div>
  );
}