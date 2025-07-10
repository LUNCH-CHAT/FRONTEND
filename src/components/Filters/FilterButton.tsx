// src/components/Filters/FilterButton.tsx

import { ChevronDown } from 'lucide-react'; // 아이콘 사용 (lucide-react 설치 필요)

interface FilterButtonProps {
  label: string;
  onClick: () => void;
  selected: boolean;
}

export default function FilterButton({ label, onClick, selected }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1 px-4 py-1.5 rounded-full text-sm font-medium border transition-all
        ${selected ? 'bg-primary text-white border-primary' : 'bg-white text-gray-500 border-gray-300'}
      `}
    >
      {label}
      <ChevronDown size={16} />
    </button>
  );
}
