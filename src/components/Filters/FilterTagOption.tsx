// src/components/Filters/FilterTagOption.tsx

interface FilterTagOptionProps {
  options: string[];
  selected: string;
  onSelect?: (value: string) => void;
}

export default function FilterTagOption({
  options,
  selected,
  onSelect,
}: FilterTagOptionProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(option => {
        const isSelected = option === selected;
        return (
          <button
            key={option}
            type="button"
            onClick={() => onSelect?.(option)}
            className={`
              px-5 py-2 rounded-full text-base font-medium border transition
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
