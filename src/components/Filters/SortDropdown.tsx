import { useState, useRef, useEffect } from 'react';
import ChoiceIcon from '@/assets/icons/choice.svg?react';

interface SortDropdownProps {
  selected: string;
  options: string[];
  onSelect: (option: string) => void;
}

export default function SortDropdown({ selected, options, onSelect }: SortDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          flex items-center gap-1
          px-[8px]
          w-[71px]
          h-[30px]
          rounded-full
          text-[13px]
          font-medium
          border transition-all
          bg-gray-100 text-gray-700 border-gray-300
        "
      >
        <ChoiceIcon className="w-3 h-3" /> 
        {selected}
      </button>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-gray-100 border border-gray-200 rounded-md shadow-md z-50">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onSelect(option);
                setIsOpen(false);
              }}
              className={`
                w-full text-left
                px-3    /* 동일하게 px-3로 조정 */
                h-[30px]
                text-[13px]
                hover:bg-gray-100
                ${
                  option === selected
                    ? 'bg-gray-100 text-primary font-semibold'
                    : 'text-gray-700'
                }
              `}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
