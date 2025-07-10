// src/components/Filters/FilterModalYear.tsx

import { useEffect, useState } from 'react';
import FilterTagOption from './FilterTagOption';
import FilterButton from './FilterButton';

interface FilterModalYearProps {
  years: string[];
  localYear: string;
  resetFilters: () => void;
  applyFilters: () => void;
}

export default function FilterModalYear({
  years,
  localYear,
  resetFilters,
  applyFilters,
}: FilterModalYearProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[700px] z-50 p-6 bg-white rounded-t-2xl shadow-lg transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
      }`}
    >
      <h3 className="font-semibold text-base mb-2">학번</h3>
      <FilterTagOption
        options={years}
        selected={localYear}
      />
      <div className="flex gap-4 mt-6">
        <FilterButton label="초기화" onClick={resetFilters} selected={false} />
        <FilterButton label="적용하기" onClick={applyFilters} selected={true} />
      </div>
    </div>
  );
}
