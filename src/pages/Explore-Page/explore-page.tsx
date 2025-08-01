// src/pages/Explore-Page/explore-page.tsx

import axios from 'axios';
import type {
  ResponseCollegeListDto,
  ResponseDepartmentListDto,
} from '../../types/college';
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

// 실제 API 응답 구조에 맞춘 타입 정의
export type ResponseMembersFiltersDto = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    memberId: number;
    memberName: string;
    profileImageUrl: string;
    studentNo: string;
    department: string;
    userInterests: string[];
    userKeywords: { id: number; type: string; title: string; description: string }[];
  }[];
};

const interestMap: Record<string, string> = {
  전체: '',
  교환학생: 'EXCHANGE_STUDENT',
  '취업/진로': 'CAREER',
  고시준비: 'EXAM_PREPARATION',
  창업: 'STARTUP',
  학점관리: 'GRADE_MANAGEMENT',
  '외국어 공부': 'FOREIGN_LANGUAGE',
  '취미/여가': 'HOBBY',
  학교생활: 'SCHOOL_LIFE',
};

const reverseInterestMap = Object.entries(interestMap).reduce(
  (acc, [label, key]) => {
    if (key) acc[key] = label;
    return acc;
  },
  {} as Record<string, string>
);

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
  const [profiles, setProfiles] = useState<Profile[]>([]);

  // 1) 단과대 리스트
  useEffect(() => {
    axios
      .get<ResponseCollegeListDto>('/api/colleges')
      .then((res) => setColleges(res.data.result ?? []))
      .catch(() => setColleges([]));
  }, []);

  // 2) 학과 리스트
  const collegeId = colleges.find((c) => c.name === selectedDepartment)?.id;
  useEffect(() => {
    if (!collegeId) {
      setMajors([]);
      return;
    }
    axios
      .get<ResponseDepartmentListDto>(`/api/colleges/${collegeId}/departments`)
      .then((res) => setMajors(res.data.result.map((d) => d.name)))
      .catch(() => setMajors([]));
  }, [collegeId]);

  // 3) URL 카테고리 파라미터
  useEffect(() => {
    const param = searchParams.get('category') || '';
    setSelectedCategory(param);
  }, [searchParams]);

  // 4) 모달 오픈 시 스크롤 락 & 네비 숨김
  useEffect(() => {
    document.body.style.overflow = showDeptModal || showYearModal ? 'hidden' : 'auto';
    setHideNav(showDeptModal || showYearModal);
  }, [showDeptModal, showYearModal, setHideNav]);

  // 5) 필터/정렬 변경 시 프로필 조회 (params 로 각 필드 분리)
  useEffect(() => {
    const params: Record<string, any> = {
      size: 10,
      page: 0,
      sort: sortOrder === '추천순' ? 'recommend' : 'newest',
      ...(selectedCategory && selectedCategory !== '전체' && {
        interest: interestMap[selectedCategory],
      }),
      ...(selectedDepartment && { college: selectedDepartment }),
      ...(selectedMajor     && { department: selectedMajor }),
      ...(selectedYear      && { studentNo: selectedYear }),
    };

    axios
      .get<ResponseMembersFiltersDto>('/api/members/filters', {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        if (!res.data.isSuccess) {
          setProfiles([]);
          return;
        }
        const mapped = res.data.result.map((m) => ({
          id: m.memberId.toString(),
          name: m.memberName,
          image: m.profileImageUrl,
          department: `${m.department} ${m.studentNo}`,
          tags: m.userInterests.map((i) => reverseInterestMap[i] || i),
        }));
        setProfiles(mapped);
      })
      .catch((err) => {
        console.error('프로필 조회 실패', err);
        setProfiles([]);
      });
  }, [selectedCategory, sortOrder, selectedDepartment, selectedMajor, selectedYear]);

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
          {profiles.map((p) => (
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
