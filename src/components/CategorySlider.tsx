// src/components/CategorySlider.tsx

import CategoryGridItem from './CategoryGridItem';

interface CategorySliderProps {
  categories: { label: string; icon: React.ReactNode }[];
  selectedCategory: string;
  onSelect: (label: string) => void;
}

export default function CategorySlider({
  categories,
  selectedCategory,
  onSelect,
}: CategorySliderProps) {
  return (
    <div
      className="flex items-center overflow-x-auto no-scrollbar gap-x-[24px] mb-6 px-5"
      style={{ height: '58px', boxSizing: 'border-box' }}
    >
      {categories.map(({ label, icon }) => (
        <button
          key={label}
          className={`flex-shrink-0 ${
            selectedCategory === label ? 'opacity-100' : 'opacity-40'
          }`}
          onClick={() => onSelect(label)}
        >
          <CategoryGridItem icon={icon} label={label} />
        </button>
      ))}
    </div>
  );
}
