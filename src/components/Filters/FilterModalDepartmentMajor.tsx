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
  localDepartment: number | '';                             
  localMajor: string;
  applyFilters: (departmentId: number | '', major: string) => void; 
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

  // 표시용 옵션(name 리스트)
  const deptNames = useMemo(() => departments.map(d => d.name), [departments]);

  // 내부 상태
  const [localMajors, setLocalMajors] = useState<string[]>([]);
  const [selectedDeptId, setSelectedDeptId] = useState<number | ''>(localDepartment); 
  const [selectedDeptName, setSelectedDeptName] = useState<string>('');               
  const [selectedMaj, setSelectedMaj] = useState(localMajor);

  // 오픈 애니메이션
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 10);
    return () => clearTimeout(t);
  }, []);

  // props 내부 상태 동기화 id → name 매핑
  useEffect(() => {
    setSelectedDeptId(localDepartment);
    setSelectedMaj(localMajor);

    if (localDepartment === '') {
      setSelectedDeptName('');
      setLocalMajors([]);
      return;
    }

    const found = departments.find(d => d.id === localDepartment);
    setSelectedDeptName(found?.name ?? '');
  }, [departments, localDepartment, localMajor]);

  // 단대(id) 변경 시 학과 목록 갱신
  useEffect(() => {
    if (selectedDeptId === '') {
      setLocalMajors([]);
      setSelectedMaj('');
      return;
    }

    getDepartments(selectedDeptId as number)
      .then((majors) => {
        setLocalMajors(majors);
        if (!majors.includes(selectedMaj)) setSelectedMaj('');
      })
      .catch(() => {
        setLocalMajors([]);
        setSelectedMaj('');
      });
  }, [selectedDeptId, selectedMaj]);

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
            selected={selectedDeptName} 
            onSelect={(name) => {
              setSelectedDeptName(name);
              const found = departments.find(d => d.name === name);
              setSelectedDeptId(found?.id ?? '');
            }}
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
              applyFilters(selectedDeptId, selectedMaj); 
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
