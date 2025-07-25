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
  className,             
}: FilterButtonProps) {
  // pill 모드일 때는 outline 형태로, bottom 모드일 땐 배경 채움 형태로
  const pillStyles = `
    px-4
    h-[30px]
    py-[7px]
    rounded-full
    text-[13px]
    font-medium
  `;
  const bottomStyles =
    'w-[65.5px] h-[30px] px-[11px] py-[17px] rounded-[10px] text-sm font-medium flex-none';

  const colorStyles = selected
    ? variant === 'pill'
      ? 'bg-white text-[#FF786A] border-[#FF786A]'  
      : 'bg-[#FF786A] text-white border-transparent' 
    : 'bg-white text-gray-700 border-gray-300';

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'flex items-center justify-center gap-1 border transition-all',
        variant === 'bottom' ? bottomStyles : pillStyles,
        colorStyles,
        className
      )}
    >
      {label}
      {!hideIcon && <ChevronDown size={16} />}
    </button>
  );
}
