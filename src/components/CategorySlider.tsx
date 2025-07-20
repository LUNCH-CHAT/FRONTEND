import CategoryGridItem from './CategoryGridItem';

interface CategorySliderProps {
  categories: { label: string; icon: React.ReactNode }[];
  selectedCategory: string;
  onSelect: (_label: string) => void;
}

export default function CategorySlider({
  categories,
  selectedCategory,
  onSelect,
}: CategorySliderProps) {
  return (
    <div
      className="flex items-center overflow-x-auto no-scrollbar gap-x-[24px] mb-6 px-5"
      style={{ height: '65px', boxSizing: 'border-box' }}
    >
      {categories.map((category) => (
        <button
          key={category.label}
          type="button"
          onClick={() => onSelect(category.label)}
          className={`
            flex-shrink-0 pb-1
            ${selectedCategory === category.label
              ? 'text-[#FF7C6A] font-bold border-b-2 border-[#FF7C6A]'
              : 'text-[#7D7D7D]'}
          `}
        >
          <CategoryGridItem
            icon={category.icon}
            label={category.label}
          />
        </button>
      ))}
    </div>
  );
}
