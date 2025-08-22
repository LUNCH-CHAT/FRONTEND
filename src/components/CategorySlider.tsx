// src/components/CategorySlider.tsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
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

  // 드래그와 클릭 구분용 플래그
  const [isDragging, setIsDragging] = useState(false);
  const dragTimerRef = useRef<number | null>(null);

  const setDraggingSafely = useCallback((val: boolean) => {
    setIsDragging(val);
    if (dragTimerRef.current) {
      window.clearTimeout(dragTimerRef.current);
      dragTimerRef.current = null;
    }
    if (!val) return;
    // 드래그 종료 후 아주 짧게만 드래그 상태 유지했다가 해제
    dragTimerRef.current = window.setTimeout(() => {
      setIsDragging(false);
      dragTimerRef.current = null;
    }, 80);
  }, []);

  // 현재 선택된 카테고리의 인덱스 계산 (컨트롤드)
  const selectedIndex = useMemo(() => {
    const idx = categories.findIndex((c) => c.label === selectedCategory);
    return idx >= 0 ? idx : 0;
  }, [categories, selectedCategory]);

  // 선택 변경 시 해당 슬라이드로 이동 (애니메이션 0으로 튀는 문제 방지 위해 살짝만)
  useEffect(() => {
    if (!swiperRef.current) return;
    // 이미 그 위치면 noop
    if (swiperRef.current.activeIndex !== selectedIndex) {
      swiperRef.current.slideTo(selectedIndex, 150); // 0 -> 150ms로 부드럽게
    }
  }, [selectedIndex]);

  // 클릭 핸들러 (드래그 중 클릭 무시)
  const handleClick = useCallback(
    (label: string) => {
      if (isDragging) return;
      onSelect(label); // ← 즉시 1회 호출 (컨트롤드 상위에서 상태/URL 동기화)
    },
    [isDragging, onSelect]
  );

  return (
    <div className="w-full px-4 box-border">
      <Swiper
        spaceBetween={16}
        slidesPerView="auto"
        className="no-scrollbar"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        // 드래그 감지
        onTouchMove={() => setDraggingSafely(true)}
        onTouchEnd={() => setDraggingSafely(false)}
        onSliderFirstMove={() => setDraggingSafely(true)}
        onTransitionEnd={() => setDraggingSafely(false)}
      >
        {categories.map((category) => (
          <SwiperSlide key={category.label} style={{ width: 'auto' }}>
            <button
              type="button"
              onClick={() => handleClick(category.label)}
              className={`
                flex flex-col items-center
                px-2 pt-2 pb-2 max-[480px]:min-h-[84px]
                ${selectedCategory === category.label
                  ? 'text-[#F56156] font-bold'
                  : 'text-[#7D7D7D]'}
              `}
              aria-pressed={selectedCategory === category.label}
            >
              <CategoryGridItem icon={category.icon} label={category.label} />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
