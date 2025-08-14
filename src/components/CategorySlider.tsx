// src/components/CategorySlider.tsx
import React, { useEffect, useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperCore } from 'swiper';
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
  const swiperRef = useRef<SwiperCore | null>(null);

  // 현재 선택된 카테고리의 인덱스 계산
  const selectedIndex = useMemo(() => {
    const idx = categories.findIndex(c => c.label === selectedCategory);
    return idx >= 0 ? idx : 0;
  }, [categories, selectedCategory]);

  // 선택 변경 시 해당 슬라이드로 이동
  useEffect(() => {
    if (!swiperRef.current) return;
    swiperRef.current.slideTo(selectedIndex, 0); 
  }, [selectedIndex]);

  return (
    <div className="w-full px-4 box-border">
      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        className="no-scrollbar"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
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
                px-2 pt-2 pb-2 max-[480px]:min-h-[84px]
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
