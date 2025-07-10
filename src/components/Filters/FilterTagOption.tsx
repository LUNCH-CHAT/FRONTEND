interface FilterTagOptionProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}

export default function FilterTagOption({
  options,
  selected,
  onSelect,
}: FilterTagOptionProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map(option => (
        <button
          key={option}
          onClick={() => onSelect(option)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
            selected === option
              ? 'bg-primary text-white border-primary'
              : 'bg-white text-gray-700 border-gray-300'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
