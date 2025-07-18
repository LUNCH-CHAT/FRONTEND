// src/components/Filters/FilterModalYear.tsx
import { useEffect, useState } from 'react';
import FilterTagOption from './FilterTagOption';
import FilterButton from './FilterButton';

interface FilterModalYearProps {
  years: string[];
  localYear: string;
  resetFilters: () => void;
  applyFilters: () => void;
  onClose: () => void;
}

export default function FilterModalYear({
  years,
  localYear,
  resetFilters,
  applyFilters,
  onClose,
}: FilterModalYearProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="fixed inset-0 z-40 bg-black/40 flex justify-center items-end"
      onMouseDown={onClose}
    >
      <div
        className={`
          w-full max-w-[480px] rounded-t-2xl bg-white p-6
          transition-all duration-300
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}
        `}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h3 className="font-semibold text-base mb-2">학번</h3>
        <FilterTagOption options={years} selected={localYear} />

        {/* 버튼 그룹 */}
        <div className="flex justify-center gap-2 mt-16">
          {/* 초기화: 기본 92px, 480px 이상(xs) → 107px */}
          <FilterButton
            label="초기화"
            onClick={() => {
              resetFilters();
              onClose();
            }}
            selected={false}
            hideIcon
            variant="bottom"
            className="xs:w-[107px]"
          />

          <FilterButton
            label="적용하기"
            onClick={() => {
              applyFilters();
              onClose();
            }}
            selected={true}
            hideIcon
            variant="bottom"
            className="w-[235px] xs:w-[322px]"
          />
        </div>
      </div>
    </div>
  );
}
