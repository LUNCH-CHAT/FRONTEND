// src/pages/Explore-Page/explore-page.tsx
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

  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showDepartmentMajorModal, setShowDepartmentMajorModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState('전체');
  const [selectedMajor, setSelectedMajor] = useState('전체');
  const [selectedYear, setSelectedYear] = useState('전체');
  const [sortOrder, setSortOrder] = useState<'추천순' | '최신순'>('최신순');

  useEffect(() => {
    const param = searchParams.get('category') || '전체';
    setSelectedCategory(param);
  }, [searchParams]);

  useEffect(() => {
    document.body.style.overflow =
      showDepartmentMajorModal || showYearModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showDepartmentMajorModal, showYearModal]);

  useEffect(() => {
    setHideNav(showDepartmentMajorModal || showYearModal);
  }, [showDepartmentMajorModal, showYearModal, setHideNav]);

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

  const profiles = [
    { id: '1', name: '쑤기', department: '컴퓨터공학과 23학번', tags: ['학점관리'], image: '/images/profile.png' },
    { id: '2', name: '소피아', department: '국어국문학과 22학번', tags: ['창업', '취미/여가'], image: '/images/profile.png' },
    { id: '3', name: '제임스', department: '전자공학과 21학번', tags: ['교환학생', '외국어 공부'], image: '/images/profile.png' },
    { id: '4', name: '마피아', department: '국어국문학과 22학번', tags: ['취업/진로', '취미/여가'], image: '/images/profile.png' },
    { id: '5', name: '쑥', department: '전자공학과 21학번', tags: ['고시', '외국어 공부'], image: '/images/profile.png' },
    { id: '6', name: '바이크', department: '전자공학과 21학번', tags: ['학교생활', '외국어 공부'], image: '/images/profile.png' },
  ];

  const filteredProfiles = profiles
    .filter(
      profile =>
        (selectedCategory === '전체' || profile.tags.includes(selectedCategory)) &&
        (selectedDepartment === '전체' || profile.department.includes(selectedDepartment)) &&
        (selectedMajor === '전체' || profile.department.includes(selectedMajor)) &&
        (selectedYear === '전체' || profile.department.includes(selectedYear))
    )
    .sort((a, b) => {
      if (sortOrder === '추천순') return a.name.localeCompare(b.name);
      return b.id.localeCompare(a.id);
    });

  return (
    <div className="w-full min-h-screen bg-white font-[pretendard] flex flex-col items-center pb-28">
      <div className="w-full max-w-[700px] ">
        <CategorySlider
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className="mb-[17px] flex gap-2 flex-wrap justify-start px-4 mt-4 mb-4">
          <SortDropdown
            selected={sortOrder}
            options={['추천순', '최신순']}
            onSelect={(option) => setSortOrder(option as '추천순' | '최신순')}
          />

          <FilterButton
            label="학과"
            onClick={() => setShowDepartmentMajorModal(true)}
            selected={
              showDepartmentMajorModal ||
              selectedDepartment !== '전체' ||
              selectedMajor !== '전체'
            }
            variant="pill"
          />

          <FilterButton
            label="학번"
            onClick={() => setShowYearModal(true)}
            selected={showYearModal || selectedYear !== '전체'}
            variant="pill"
          />
        </div>

        <div className="px-5 grid grid-cols-2 xs:grid-cols-3 gap-4">
          {filteredProfiles.map(profile => (
            <ProfileCard
              key={profile.id}
              id={profile.id}
              name={profile.name}
              department={profile.department}
              tags={profile.tags}
              image={profile.image}
            />
          ))}
        </div>
      </div>

      {showDepartmentMajorModal && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
          <div className="w-full sm:max-w-[700px]">
            <FilterModalDepartmentMajor
              departments={['공과대학', '자연과학대학', '인문과학대학']}
              majors={['컴퓨터공학과', '전자공학과', '국어국문학과']}
              localDepartment={selectedDepartment}
              localMajor={selectedMajor}
              onClose={() => setShowDepartmentMajorModal(false)}
              resetFilters={() => {
                setSelectedDepartment('전체');
                setSelectedMajor('전체');
                setShowDepartmentMajorModal(false);
              }}
              applyFilters={(dept, maj) => {
                setSelectedDepartment(dept);
                setSelectedMajor(maj);
                setShowDepartmentMajorModal(false);
              }}
            />
          </div>
        </div>
      )}

      {showYearModal && (
        <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center">
          <div className="w-full sm:max-w-[700px]">
            <FilterModalYear
              years={['25학번', '24학번', '23학번', '22학번', '21학번', '20학번 이상']}
              localYear={selectedYear}
              resetFilters={() => {
                setSelectedYear('전체');
                setShowYearModal(false);
              }}
              applyFilters={(year) => {
                setSelectedYear(year);
                setShowYearModal(false);
              }}
              onClose={() => setShowYearModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
