// src/components/Filters/FilterModalDepartmentMajor.tsx
import { useEffect, useState } from 'react';
import FilterTagOption from './FilterTagOption';
import FilterButton from './FilterButton';

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
          pt-6 pb-6 pl-5 pr-[19px]     /* 왼쪽 20px, 오른쪽 19px */
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
              applyFilters(selectedDept, selectedMaj);
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
