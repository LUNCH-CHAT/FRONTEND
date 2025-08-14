// src/components/Filters/FilterModalYear.tsx
import { useEffect, useState } from 'react';
import FilterTagOption from './FilterTagOption';

interface FilterModalYearProps {
  years: string[];
  localYear: string;
  resetFilters: () => void;
  applyFilters: (year: string) => void;
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
  const [selected, setSelected] = useState(localYear);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="fixed inset-0 z-80 bg-black/40 flex justify-center items-end"
      onMouseDown={onClose}
    >
      <div
        className={`
          w-full max-w-[480px]
          rounded-t-2xl bg-white
          pt-6 pb-6 pl-5 pr-[19px]       
          transition-all duration-300
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}
        `}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h3 className="font-semibold text-base mb-2">학번</h3>

        {/* 선택 옵션 */}
        <FilterTagOption
          options={years}
          selected={selected}
          onSelect={(year) => setSelected(year)}
        />

        {/* 버튼 그룹 */}
        <div className="flex justify-between items-center gap-2 mt-16">
          {/* 초기화 버튼 */}
          <button
            type="button"
            onClick={() => {
              resetFilters();
              onClose();
            }}
            className={`
              h-[50px]
              w-[92px] xs:w-[107px]
              text-[16px] font-medium
              rounded-[10px]
              border border-gray-300
              bg-white text-gray-700
            `}
          >
            초기화
          </button>

          {/* 적용하기 버튼 */}
          <button
            type="button"
            onClick={() => {
              applyFilters(selected);
              onClose();
            }}
            className={`
              h-[50px]
              w-[235px] xs:w-[322px]
              text-[16px] font-medium
              rounded-[10px]
              border border-transparent
              bg-[#F56156] text-white
            `}
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}
