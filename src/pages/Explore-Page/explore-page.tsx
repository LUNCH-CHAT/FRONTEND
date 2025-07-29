import axios from 'axios';
import type { ResponseCollegeListDto, ResponseDepartmentListDto } from '../../types/college';
import type { Profile } from '../../types/profile';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNav } from '../../context/NavContext';

import ProfileCard from '../../components/ProfileCard';
import CategorySlider from '../../components/CategorySlider';
import FilterModalDepartmentMajor from '../../components/Filters/FilterModalDepartmentMajor';
import FilterModalYear from '../../components/Filters/FilterModalYear';
import FilterButton from '../../components/Filters/FilterButton';
import SortDropdown from '../../components/Filters/SortDropdown';

import AllIcon from '@/assets/icons/entire.svg?react';
import ExchangeIcon from '@/assets/icons/exchangestudent.svg?react';
import CareerIcon from '@/assets/icons/career.svg?react';
import ExamIcon from '@/assets/icons/exampreparation.svg?react';
import StartupIcon from '@/assets/icons/startups.svg?react';
import GradeIcon from '@/assets/icons/graditmanagement.svg?react';
import LanguageIcon from '@/assets/icons/forienlanguage.svg?react';
import HobbyIcon from '@/assets/icons/extreaactivities.svg?react';
import SchoolIcon from '@/assets/icons/campus.svg?react';

export default function ExplorePage() {
  const [searchParams] = useSearchParams();
  const { setHideNav } = useNav();

  const [selectedCategory, setSelectedCategory] = useState('');
  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortOrder, setSortOrder] = useState<'추천순' | '최신순'>('최신순');

  const [colleges, setColleges] = useState<{ id: number; name: string }[]>([]);
  const [majors, setMajors] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get<ResponseCollegeListDto>('/api/colleges')
      .then((res) => {
        const collegeList = res.data?.result ?? [];
        setColleges(collegeList);
      })
      .catch((err) => {
        console.error('단과대 불러오기 실패:', err);
        setColleges([]);
      });
  }, []);

  const collegeId =
    Array.isArray(colleges) && selectedDepartment
      ? colleges.find((c) => c.name === selectedDepartment)?.id
      : undefined;

  useEffect(() => {
    if (!collegeId || !selectedDepartment) {
      setMajors([]);
      return;
    }

    axios
      .get<ResponseDepartmentListDto>(`/api/colleges/${collegeId}/departments`)
      .then((res) => {
        const departmentList = res.data?.result ?? [];
        setMajors(departmentList.map((d) => d.name));
      })
      .catch((err) => {
        console.error('학과 불러오기 실패:', err);
        setMajors([]);
      });
  }, [collegeId, selectedDepartment]);

  useEffect(() => {
    const param = searchParams.get('category') || '';
    setSelectedCategory(param);
  }, [searchParams]);

  useEffect(() => {
    document.body.style.overflow = showDeptModal || showYearModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showDeptModal, showYearModal]);

  useEffect(() => {
    setHideNav(showDeptModal || showYearModal);
  }, [showDeptModal, showYearModal, setHideNav]);

  const categories = [
    { label: '전체', icon: <AllIcon /> },
    { label: '교환학생', icon: <ExchangeIcon /> },
    { label: '취업/진로', icon: <CareerIcon /> },
    { label: '고시준비', icon: <ExamIcon /> },
    { label: '창업', icon: <StartupIcon /> },
    { label: '학점관리', icon: <GradeIcon /> },
    { label: '외국어 공부', icon: <LanguageIcon /> },
    { label: '취미/여가', icon: <HobbyIcon /> },
    { label: '학교생활', icon: <SchoolIcon /> },
  ];

  const profiles: Profile[] = [
    { id: '1', name: '쑤기', department: '컴퓨터공학과 23학번', tags: ['학점관리'], image: '/images/profile.png' },
    { id: '2', name: '소피아', department: '국어국문학과 22학번', tags: ['창업', '취미/여가'], image: '/images/profile.png' },
    { id: '3', name: '제임스', department: '전자공학과 21학번', tags: ['교환학생', '외국어 공부'], image: '/images/profile.png' },
    { id: '4', name: '마피아', department: '국어국문학과 22학번', tags: ['취업/진로', '취미/여가'], image: '/images/profile.png' },
    { id: '5', name: '쑥', department: '전자공학과 21학번', tags: ['고시', '외국어 공부'], image: '/images/profile.png' },
    { id: '6', name: '바이크', department: '전자공학과 21학번', tags: ['학교생활', '외국어 공부'], image: '/images/profile.png' },
  ];

  const filteredProfiles = profiles
    .filter((p) =>
      // '전체'나 빈 값일 땐 필터 무시, 아니면 tags 포함 여부 검사
      (selectedCategory === '' || selectedCategory === '전체' || p.tags.includes(selectedCategory)) &&
      (!selectedDepartment || p.department.includes(selectedDepartment)) &&
      (!selectedMajor || p.department.includes(selectedMajor)) &&
      (!selectedYear || p.department.includes(selectedYear))
    )
    .sort((a, b) =>
      sortOrder === '추천순'
        ? a.name.localeCompare(b.name)
        : b.id.localeCompare(a.id)
    );


  return (
    <div className="w-full min-h-screen bg-white font-[pretendard] flex flex-col items-center pb-28">
      <div className="w-full max-w-[700px]">
        <CategorySlider
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className="mb-[17px] flex gap-2 flex-wrap justify-start px-4 mt-4 mb-4">
          <SortDropdown
            selected={sortOrder}
            options={['추천순', '최신순']}
            onSelect={(o) => setSortOrder(o as '추천순' | '최신순')}
          />

          <FilterButton
            label="학과"
            onClick={() => setShowDeptModal(true)}
            selected={showDeptModal || !!selectedDepartment || !!selectedMajor}
            variant="pill"
          />

          <FilterButton
            label="학번"
            onClick={() => setShowYearModal(true)}
            selected={showYearModal || !!selectedYear}
            variant="pill"
          />
        </div>

        <div className="px-5 grid grid-cols-2 xs:grid-cols-3 gap-4">
          {filteredProfiles.map((p) => (
            <ProfileCard key={p.id} {...p} />
          ))}
        </div>
      </div>

      {showDeptModal && (
        <FilterModalDepartmentMajor
          departments={colleges.map((c) => c.name)}
          majors={majors}
          localDepartment={selectedDepartment}
          localMajor={selectedMajor}
          resetFilters={() => {
            setSelectedDepartment('');
            setSelectedMajor('');
            setShowDeptModal(false);
          }}
          applyFilters={(d, m) => {
            setSelectedDepartment(d);
            setSelectedMajor(m);
            setShowDeptModal(false);
          }}
          onClose={() => setShowDeptModal(false)}
        />
      )}

      {showYearModal && (
        <FilterModalYear
          years={['25학번', '24학번', '23학번', '22학번', '21학번', '20학번 이상']}
          localYear={selectedYear}
          resetFilters={() => {
            setSelectedYear('');
            setShowYearModal(false);
          }}
          applyFilters={(y) => {
            setSelectedYear(y);
            setShowYearModal(false);
          }}
          onClose={() => setShowYearModal(false)}
        />
      )}
    </div>
  );
}
