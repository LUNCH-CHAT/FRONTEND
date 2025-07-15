// src/components/Filters/FilterButton.tsx

import { ChevronDown } from 'lucide-react';
import clsx from 'clsx';

type Variant = 'pill' | 'bottom';

interface FilterButtonProps {
  label: string;
  onClick: () => void;
  selected: boolean;
  hideIcon?: boolean;
  variant?: Variant;
  className?: string;
}

export default function FilterButton({
  label,
  onClick,
  selected,
  hideIcon = false,
  variant = 'pill',
}: FilterButtonProps) {
  // 1) variant별 기본 크기&모양
  const sizeStyles = variant === 'pill'
    ? 'px-4 py-1.5 rounded-full text-sm font-medium'
    : 'px-4 py-3 rounded-xl text-base font-medium flex-1';

  // 2) 선택 여부에 따른 색상
  const colorStyles = selected
    ? 'bg-[#FF786A] text-white border-[#FF786A]'
    : 'bg-white text-gray-700 border-gray-300';

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex items-center gap-1 border transition-all',
        sizeStyles,
        colorStyles
      )}
    >
      {label}
      {/* 모달 하단처럼 아이콘 숨기고 싶으면 hideIcon */}
      {!hideIcon && <ChevronDown size={16} />}
    </button>
  );
}
