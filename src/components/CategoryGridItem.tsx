// src/components/CategoryGridItem.tsx
import React from 'react';

interface CategoryGridItemProps {
  icon: React.ReactNode;
  label: string;
}

function CategoryGridItem({ icon, label }: CategoryGridItemProps) {
  return (
    <div className="flex flex-col items-center w-[64px] text-center">
      <div className="w-[40px] h-[40px] flex items-center justify-center aspect-square mb-2">
        {icon}
      </div>
      <span className="text-[13px] leading-[16px] font-normal text-black font-pretendard">
        {label}
      </span>
    </div>
  );
}

export default CategoryGridItem;
