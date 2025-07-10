import { useEffect, useState } from 'react';
import ProfileCard from '../../components/ProfileCard';
import Navbar from '../../components/Navbar';
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
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [showDepartmentMajorModal, setShowDepartmentMajorModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  const [selectedDepartment, setSelectedDepartment] = useState('전체');
  const [selectedMajor, setSelectedMajor] = useState('전체');
  const [selectedYear, setSelectedYear] = useState('전체');
  const [sortOrder, setSortOrder] = useState<'추천순' | '최신순'>('최신순');

  useEffect(() => {
    document.body.style.overflow =
      showDepartmentMajorModal || showYearModal ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showDepartmentMajorModal, showYearModal]);

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
    {
      id: '1',
      name: '쑤기',
      department: '컴퓨터공학과 23학번',
      tags: ['학점관리'],
      image: '/images/profile.png',
    },
    {
      id: '2',
      name: '소피아',
      department: '국어국문학과 22학번',
      tags: ['창업', '취미/여가'],
      image: '/images/profile.png',
    },
    {
      id: '3',
      name: '제임스',
      department: '전자공학과 21학번',
      tags: ['교환학생', '외국어 공부'],
      image: '/images/profile.png',
    },
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
    <div className="w-full min-h-screen bg-white font-pretendard flex flex-col items-center pb-28">
      <div className="w-full max-w-[700px] px-4 pt-[86px]">
        <CategorySlider
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <div className="flex gap-2 flex-wrap justify-start mt-4 mb-4">
          <SortDropdown
            selected={sortOrder}
            options={['추천순', '최신순']}
            onSelect={value => setSortOrder(value as '추천순' | '최신순')}
          />
          <FilterButton
            label="단대/학과"
            onClick={() => setShowDepartmentMajorModal(true)}
            selected={selectedDepartment !== '전체' || selectedMajor !== '전체'}
          />
          <FilterButton
            label="학번"
            onClick={() => setShowYearModal(true)}
            selected={selectedYear !== '전체'}
          />
        </div>

        <div className="grid grid-cols-2 xs:grid-cols-3 gap-4">
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

      <Navbar />

      {showDepartmentMajorModal && (
        <FilterModalDepartmentMajor
          departments={[
            '인문과학대학',
            '사회과학대학',
            '자연과학대학',
            '공과대학',
            '음악대학',
            '조형예술대학',
            '사범대학',
            '경영대학',
            '신산업융합대학',
            '의과대학',
            '간호대학',
            '약학대학',
            '스마트인재대학',
            '인공지능대학',
            '초교과융합대학',
          ]}
          majors={[
            '국어국문학과',
            '중어중문학과',
            '독어독문학과',
            '사학과',
            '철학과',
            '기독교교육과',
            '영어영문학과',
            '컴퓨터공학과',
            '전자공학과',
          ]}
          localDepartment={selectedDepartment}
          setLocalDepartment={setSelectedDepartment}
          localMajor={selectedMajor}
          setLocalMajor={setSelectedMajor}
          applyFilters={() => setShowDepartmentMajorModal(false)}
          resetFilters={() => {
            setSelectedDepartment('전체');
            setSelectedMajor('전체');
          }}
          onClose={() => setShowDepartmentMajorModal(false)}
        />
      )}

      {showYearModal && (
        <FilterModalYear
          years={['25학번', '24학번', '23학번', '22학번', '21학번', '20학번 이상']}
          localYear={selectedYear}
          setLocalYear={setSelectedYear}
          applyFilters={() => setShowYearModal(false)}
          resetFilters={() => setSelectedYear('전체')}
        />
      )}
    </div>
  );
}