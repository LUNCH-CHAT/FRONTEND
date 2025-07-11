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
        className={`w-full max-w-[700px] rounded-t-2xl bg-white p-6
          transition-all duration-300 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
          }`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <h3 className="font-semibold text-base mb-2">학번</h3>
        <FilterTagOption options={years} selected={localYear} />

        <div className="flex gap-4 mt-6">
          <FilterButton
            label="초기화"
            onClick={resetFilters}
            selected={false}
            hideIcon
            variant="pill"
          />

          <div className="flex-1">
            <FilterButton
              label="적용하기"
              onClick={() => {
                applyFilters();
                onClose();
              }}
              selected={true}
              hideIcon
              variant="bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
