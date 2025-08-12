// src/components/CategorySlider.tsx

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
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
    <div className="w-full px-4 box-border">
      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        className="no-scrollbar"
      >
        {categories.map((category) => (
          <SwiperSlide
            key={category.label}
            style={{ width: 'auto' }}
          >
            <button
              type="button"
              onClick={() => onSelect(category.label)}
              className={`
                flex flex-col items-center
                px-2 pb-1
                ${selectedCategory === category.label
                  ? 'text-[#F56156] font-bold'
                  : 'text-[#7D7D7D]'}
              `}
            >
              <CategoryGridItem
                icon={category.icon}
                label={category.label}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
