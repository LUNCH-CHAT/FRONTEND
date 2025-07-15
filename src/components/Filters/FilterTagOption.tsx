// src/components/Filters/FilterTagOption.tsx

interface FilterTagOptionProps {
  options: string[];
  selected: string;
  onSelect?: (_value: string) => void;
}

export default function FilterTagOption({
  options,
  selected,
  onSelect,
}: FilterTagOptionProps) {
  return (
    <div
      className={`
        flex flex-wrap gap-[10px]
        [@media(min-width:480px)]:flex-nowrap
        [@media(min-width:480px)]:overflow-x-auto
        [@media(min-width:480px)]:gap-2
      `}
    >
      {options.map(option => {
        const isSelected = option === selected;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect?.(option)}
            className={`
              flex-shrink-0 whitespace-nowrap rounded-full border transition

              /* 모바일 (<480px)용 작게 */
              py-[10px] px-[12px] text-sm

              /* 데스크탑 (>=480px)용 원래 크기 */
              [@media(min-width:480px)]:py-2
              [@media(min-width:480px)]:px-5
              [@media(min-width:480px)]:text-base

              ${isSelected
                ? 'bg-[#FF786A] text-white border-[#FF786A]'
                : 'bg-white text-gray-700 border-gray-300'}
            `}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
