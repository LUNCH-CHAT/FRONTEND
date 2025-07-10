// src/components/Filters/FilterModalDepartmentMajor.tsx

import { useEffect, useState } from 'react';
import FilterTagOption from './FilterTagOption';
import FilterButton from './FilterButton';

interface Props {
  departments: string[];
  majors: string[];
  localDepartment: string;

  localMajor: string;

  applyFilters: () => void;
  resetFilters: () => void;
  onClose: () => void;
}

export default function FilterModalDepartmentMajor({
  departments,
  majors,
  localDepartment,

  localMajor,

  applyFilters,
  resetFilters,
  onClose,
}: Props) {
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
      <div className="mb-6">
        <h3 className="font-semibold text-base mb-2">단대</h3>
        <FilterTagOption
          options={departments}
          selected={localDepartment}
        
        />
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-base mb-2">학과</h3>
        <FilterTagOption
          options={majors}
          selected={localMajor}
          
        />
      </div>

      <div className="flex gap-4 mt-4">
        <FilterButton label="초기화" onClick={resetFilters} selected={false} />
        <FilterButton
          label="적용하기"
          onClick={() => {
            applyFilters();
            onClose();
          }}
          selected={true}
        />
      </div>
    </div>
  );
}
