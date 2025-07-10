
import FilterButton from './FilterButton';

interface FilterTagModalProps {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
  onReset: () => void;
  onApply: () => void;
}

export default function FilterTagModal({
  title,
  options,
  selected,
  onSelect,
  onClose,
  onReset,
  onApply,
}: FilterTagModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-40">
      <div className="w-full max-w-[700px] bg-white rounded-t-2xl p-6">
        <h3 className="text-base font-semibold mb-4">{title}</h3>
        <div className="flex flex-wrap gap-2 mb-6">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => onSelect(option)}
              className={`px-4 py-2 rounded-full text-sm border transition-all
                ${
                  selected === option
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-gray-700 border-gray-300'
                }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex gap-4">
          <FilterButton label="초기화" onClick={onReset} selected={false} />
          <FilterButton
            label="적용하기"
            onClick={() => {
              onApply();
              onClose();
            }}
            selected={true}
          />
        </div>
      </div>
    </div>
  );
}
