// src/pages/Explore-Page/explore-page.tsx
import type { Profile } from '../../types/profile';
import {
  getColleges,
  getFilteredMembers,
  type MemberFilterParams,
} from '../../api/explore';
import { useSearchParams } from 'react-router-dom';
import { useEffect, useState, useCallback } from 'react';
import { useNav } from '../../context/NavContext';

import ProfileCard from '../../components/ProfileCard';
import CategorySlider from '../../components/CategorySlider';
import FilterModalDepartmentMajor from '../../components/Filters/FilterModalDepartmentMajor';
import FilterModalYear from '../../components/Filters/FilterModalYear';
import FilterButton from '../../components/Filters/FilterButton';
import SortDropdown from '../../components/Filters/SortDropdown';

import { useInView } from 'react-intersection-observer';
import { LoadingSpinner } from '../../components/LoadingSpinner';

import AllIcon from '@/assets/icons/entire.svg?react';
import ExchangeIcon from '@/assets/icons/exchangestudent.svg?react';
import CareerIcon from '@/assets/icons/career.svg?react';
import ExamIcon from '@/assets/icons/exampreparation.svg?react';
import StartupIcon from '@/assets/icons/startups.svg?react';
import GradeIcon from '@/assets/icons/graditmanagement.svg?react';
import LanguageIcon from '@/assets/icons/forienlanguage.svg?react';
import HobbyIcon from '@/assets/icons/extreaactivities.svg?react';
import SchoolIcon from '@/assets/icons/campus.svg?react';

const interestMap: Record<string, string> = {
  전체: '',
  교환학생: 'EXCHANGE_STUDENT',
  '취업/진로': 'EMPLOYMENT_CAREER',
  고시준비: 'EXAM_PREPARATION',
  창업: 'STARTUP',
  학점관리: 'GPA_MANAGEMENT',
  '외국어 공부': 'FOREIGN_LANGUAGE_STUDY',
  '취미/여가': 'HOBBY_LEISURE',
  학교생활: 'SCHOOL_LIFE',
};

const reverseInterestMap = Object.entries(interestMap).reduce((acc, [label, key]) => {
  if (key) acc[key] = label;
  return acc;
}, {} as Record<string, string>);

const PAGE_SIZE = 10;

export default function ExplorePage() {

  const [searchParams, setSearchParams] = useSearchParams();
  const { setHideNav } = useNav();

  const interestFromQuery = searchParams.get('interest');
  const categoryFromQuery = searchParams.get('category');
  const initialCategory =
    (interestFromQuery && reverseInterestMap[interestFromQuery]) ||
    categoryFromQuery ||
    '전체';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);

  const [showDeptModal, setShowDeptModal] = useState(false);
  const [showYearModal, setShowYearModal] = useState(false);

  const [selectedCollegeId, setSelectedCollegeId] = useState<number | ''>('');
  const [selectedMajor, setSelectedMajor] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [sortOrder, setSortOrder] = useState<'추천순' | '최신순'>('추천순');

  const [colleges, setColleges] = useState<{ id: number; name: string }[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);

  // 무한스크롤용 상태
  const [page, setPage] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const { ref, inView } = useInView({ threshold: 0 });


  useEffect(() => {
    const interestQ = searchParams.get('interest');
    const categoryQ = searchParams.get('category');
    const next =
      (interestQ && reverseInterestMap[interestQ]) ||
      categoryQ ||
      '전체';
    if (next !== selectedCategory) setSelectedCategory(next);
  }, [searchParams, selectedCategory]);

  // 단대 목록
  useEffect(() => {
    getColleges()
      .then(setColleges)
      .catch(() => setColleges([]));
  }, []);

  // 모달 열릴 때 배경 스크롤/네비 숨김 처리
  useEffect(() => {
    document.body.style.overflow = showDeptModal || showYearModal ? 'hidden' : 'auto';
    setHideNav(showDeptModal || showYearModal);
  }, [showDeptModal, showYearModal, setHideNav]);

  const applyCategory = useCallback(
    (label: string) => {
      setSelectedCategory(label);

      const next = new URLSearchParams(searchParams);
      next.delete('interest'); 
      if (label && label !== '전체') next.set('category', label);
      else next.delete('category');

      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  const buildParams = useCallback(
    (p: number): MemberFilterParams => {
      const interestKey = searchParams.get('interest') || interestMap[selectedCategory];
      const raw = {
        size: PAGE_SIZE,
        page: p,
        sort: sortOrder === '추천순' ? 'recommend' : 'recent',
        interest: interestKey,
        collegeId: selectedCollegeId === '' ? undefined : Number(selectedCollegeId),
        department: selectedMajor,
        studentNo: selectedYear,
      };
      return Object.fromEntries(
        Object.entries(raw).filter(([, v]) => v !== '' && v != null)
      ) as unknown as MemberFilterParams;
    },
    [searchParams, selectedCategory, sortOrder, selectedCollegeId, selectedMajor, selectedYear]
  );

  // 페이지 로드 함수
  const loadPage = useCallback(
    async (p: number, append: boolean) => {
      setIsFetching(true);
      try {
        const items = await getFilteredMembers(buildParams(p));
        const mapped = items.map((m: any) => {
          const tags: string[] = (m.userInterests ?? []).map(
            (i: string) => reverseInterestMap[i] || i
          );
          const kwFromApi = (m.userKeywords as { title: string }[] | undefined) ?? [];
          const keywords =
            kwFromApi.length > 0
              ? kwFromApi.map(k => reverseInterestMap[k.title] || k.title)
              : tags.slice(0, 3);

          return {
            id: String(m.memberId),
            name: m.memberName,
            image: m.profileImageUrl,
            department: `${m.department} ${m.studentNo}`,
            tags,
            keywords,
          } as Profile;
        });

        setProfiles(prev => (append ? [...prev, ...mapped] : mapped));
        setPage(p);
        setHasNextPage(mapped.length === PAGE_SIZE);
      } catch (err) {
        console.error('프로필 조회 실패', err);
        if (!append) setProfiles([]);
        setHasNextPage(false);
      } finally {
        setIsFetching(false);
        setIsInitialLoading(false);
      }
    },
    [buildParams]
  );

  // 필터/정렬 변경 시 첫 페이지부터 리셋 로드
  useEffect(() => {
    setIsInitialLoading(true);
    setHasNextPage(true);
    setProfiles([]);
    loadPage(0, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buildParams]);

  // 감지되면 다음 페이지 로드
  useEffect(() => {
    if (inView && !isFetching && hasNextPage && !isInitialLoading) {
      loadPage(page + 1, true);
    }
  }, [inView, isFetching, hasNextPage, isInitialLoading, page, loadPage]);

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

  // 초기 전체 로딩 스피너
  if (isInitialLoading) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white font-[pretendard] flex flex-col items-center pb-28">
      <div className="w-full max-w-[700px]">
        <CategorySlider
          key={selectedCategory} 
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={applyCategory} 
        />
        <div className="flex gap-2 flex-wrap justify-start px-4 mt-4 mb-4">
          <SortDropdown
            selected={sortOrder}
            options={['추천순', '최신순']}
            onSelect={o => setSortOrder(o as '추천순' | '최신순')}
          />
          <FilterButton
            label="학과"
            onClick={() => setShowDeptModal(true)}
            selected={showDeptModal || selectedCollegeId !== '' || !!selectedMajor}
            variant="pill"
          />
          <FilterButton
            label="학번"
            onClick={() => setShowYearModal(true)}
            selected={showYearModal || !!selectedYear}
            variant="pill"
          />
        </div>

        {profiles.length > 0 ? (
          <>
            <div className="px-5 grid grid-cols-2 xs:grid-cols-3 gap-4">
              {profiles.map(p => (
                <ProfileCard key={p.id} {...p} />
              ))}
            </div>

            {/* 하단 로딩 스피너 (다음 페이지 로딩 중) */}
            {isFetching && hasNextPage && (
              <div className="py-6 flex justify-center">
                <LoadingSpinner />
              </div>
            )}

            {/* 무한스크롤 센티넬 */}
            <div ref={ref} />
          </>
        ) : (
          <div className="px-5 py-16 text-center text-gray-400 font-[pretendard]">
            조건에 맞는 프로필이 없습니다.
          </div>
        )}
      </div>

      {showDeptModal && (
        <FilterModalDepartmentMajor
          departments={colleges}
          localDepartment={selectedCollegeId}
          localMajor={selectedMajor}
          resetFilters={() => {
            setSelectedCollegeId('');
            setSelectedMajor('');
            setShowDeptModal(false);
          }}
          applyFilters={(d, m) => {
            setSelectedCollegeId(d === '' ? '' : Number(d));
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
          applyFilters={y => {
            setSelectedYear(y);
            setShowYearModal(false);
          }}
          onClose={() => setShowYearModal(false)}
        />
      )}
    </div>
  );
}
