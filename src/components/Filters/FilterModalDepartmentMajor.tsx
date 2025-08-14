// src/components/Filters/FilterModalDepartmentMajor.tsx
import { useEffect, useMemo, useState } from 'react';
import FilterTagOption from './FilterTagOption';
import { getDepartments } from '../../api/explore';

interface DepartmentItem {
  id: number;
  name: string;
}

interface FilterModalDepartmentMajorProps {
  departments: DepartmentItem[];
  // majors prop은 더 이상 필요 없음 (모달이 직접 불러옴)
  localDepartment: string;
  localMajor: string;
  applyFilters: (department: string, major: string) => void;
  resetFilters: () => void;
  onClose: () => void;
}

export default function FilterModalDepartmentMajor({
  departments,
  localDepartment,
  localMajor,
  applyFilters,
  resetFilters,
  onClose,
}: FilterModalDepartmentMajorProps) {
  const [visible, setVisible] = useState(false);

  const deptNames = useMemo(() => departments.map(d => d.name), [departments]);
  const [localMajors, setLocalMajors] = useState<string[]>([]);

  const [selectedDept, setSelectedDept] = useState(localDepartment);
  const [selectedMaj, setSelectedMaj] = useState(localMajor);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const found = departments.find(d => d.name === selectedDept);
    if (!found) {
      setLocalMajors([]);
      setSelectedMaj('');
      return;
    }

    getDepartments(found.id)
      .then((majors) => {
        setLocalMajors(majors);
        // 선택했던 학과가 목록에 없으면 초기화
        if (!majors.includes(selectedMaj)) {
          setSelectedMaj('');
        }
      })
      .catch(() => {
        setLocalMajors([]);
        setSelectedMaj('');
      });
  }, [selectedDept, departments, selectedMaj]); 

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/40 flex justify-center items-end"
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
        {/* 단대 */}
        <div className="mb-0">
          <h3 className="font-semibold text-base mb-2">단대</h3>
          <FilterTagOption
            options={deptNames}
            selected={selectedDept}
            onSelect={(name) => setSelectedDept(name)}
          />
        </div>

        <div className="h-[7px] bg-gray-100 mt-[21px] mb-[21px] -ml-5 -mr-[19px]" />

        {/* 학과 (단대 선택 시 즉시 갱신) */}
        <div className="mb-6">
          <h3 className="font-semibold text-base mb-2">학과</h3>
          <FilterTagOption
            options={localMajors}
            selected={selectedMaj}
            onSelect={(m) => setSelectedMaj(m)}
          />
        </div>

        {/* 버튼 그룹 */}
        <div className="flex justify-between items-center gap-2 mt-16">
          <button
            type="button"
            onClick={() => {
              resetFilters();
              onClose();
            }}
            className="
              h-[50px]
              w-[92px] xs:w-[107px]
              text-[16px] font-medium
              rounded-[10px]
              border border-gray-300
              bg-white text-gray-700
            "
          >
            초기화
          </button>

          <button
            type="button"
            onClick={() => {
              applyFilters(selectedDept, selectedMaj);
              onClose();
            }}
            className="
              h-[50px]
              w-[235px] xs:w-[322px]
              text-[16px] font-medium
              rounded-[10px]
              border border-transparent
              bg-[#F56156] text-white
            "
          >
            적용하기
          </button>
        </div>
      </div>
    </div>
  );
}
