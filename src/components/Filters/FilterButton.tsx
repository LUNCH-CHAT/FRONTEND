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
 
  const pillStyles = 'px-4 py-1.5 rounded-full text-sm font-medium';

  const bottomStyles =
    'w-[92px] h-[50px] px-[15px] py-[17px] rounded-[10px] text-sm font-medium flex-none';


  const colorStyles = selected
    ? 'bg-[#FF786A] text-white border-transparent'
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
