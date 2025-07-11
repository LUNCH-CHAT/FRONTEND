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
      {categories.map((category) => (
        <button
          key={category.label}
          className={`flex-shrink-0 ${
            selectedCategory === category.label ? 'opacity-100' : 'opacity-40'
          }`}
          onClick={() => onSelect(category.label)}
        >
          <CategoryGridItem icon={category.icon} label={category.label} />
        </button>
      ))}
    </div>
  );
}
