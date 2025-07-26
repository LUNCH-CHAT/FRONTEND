// src/components/Filters/FilterModalDepartmentMajor.tsx
import { useEffect, useState } from 'react';
import FilterTagOption from './FilterTagOption';

interface FilterModalDepartmentMajorProps {
  departments: string[];
  majors: string[];
  localDepartment: string;
  localMajor: string;
  applyFilters: (department: string, major: string) => void;
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
}: FilterModalDepartmentMajorProps) {
  const [visible, setVisible] = useState(false);
  const [selectedDept, setSelectedDept] = useState(localDepartment);
  const [selectedMaj, setSelectedMaj] = useState(localMajor);

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
          w-full max-w-[480px]
          rounded-t-2xl bg-white
          pt-6 pb-6 pl-5 pr-[19px]
          transition-all duration-300
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}
        `}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="mb-6">
          <h3 className="font-semibold text-base mb-2">단대</h3>
          <FilterTagOption
            options={departments}
            selected={selectedDept}
            onSelect={setSelectedDept}
          />
        </div>

        <div className="mb-6">
          <h3 className="font-semibold text-base mb-2">학과</h3>
          <FilterTagOption
            options={majors}
            selected={selectedMaj}
            onSelect={setSelectedMaj}
          />
        </div>

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
              applyFilters(selectedDept, selectedMaj);
              onClose();
            }}
            className={`
              h-[50px]
              w-[235px] xs:w-[322px]
              text-[16px] font-medium
              rounded-[10px]
              border border-transparent
              bg-[#FF786A] text-white
            `}
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}
