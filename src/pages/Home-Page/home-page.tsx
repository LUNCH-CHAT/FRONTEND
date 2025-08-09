// src/pages/Home-Page/home-page.tsx

import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getRecommendations, getPopularMembers } from '../../api/home';
import { getUniName } from '../../api/auth';  
import type {
  RecommendationProfile,
  PopularProfile,
} from '../../types/profile';

import HomeHeader from '../../components/Headers/HomeHeader';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import CategoryGridItem from '../../components/CategoryGridItem';
import ProfileCard from '../../components/ProfileCard';
import InfoCard from '../../components/InfoCard';

import ExchangeIcon from '@/assets/icons/exchangestudent.svg?react';
import CareerIcon from '@/assets/icons/career.svg?react';
import ExamIcon from '@/assets/icons/exampreparation.svg?react';
import StartupIcon from '@/assets/icons/startups.svg?react';
import GradeIcon from '@/assets/icons/graditmanagement.svg?react';
import LanguageIcon from '@/assets/icons/forienlanguage.svg?react';
import HobbyIcon from '@/assets/icons/extreaactivities.svg?react';
import SchoolIcon from '@/assets/icons/campus.svg?react';
import LunchatIcon from '@/assets/icons/lunchat.svg?react';
import QuestionIcon from '@/assets/icons/question.svg?react';
import homeBg from '@/assets/images/home-bg1.png';

export default function HomePage() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationProfile[]>([]);
  const [popularMembers, setPopularMembers] = useState<PopularProfile[]>([]);
  const [schoolName, setSchoolName] = useState('');  

  /** 카테고리 클릭 시 ExplorePage로 이동 */
  const handleCategoryClick = (label: string) => {
    navigate(`/explore?category=${encodeURIComponent(label)}`);
  };
    // 소속 학교명 조회 휘션
  useEffect(() => {
    getUniName()
      .then(res => setSchoolName(res.data))
      .catch(err => console.error('학교명 불러오기 실패:', err));
  }, []);

  // “나와 ‘시간표 · 관심사’가 겹쳐요!” API 호출
  useEffect(() => {
    getRecommendations()
      .then(res => {
        setRecommendations(res.data.result ?? []);
      })
      .catch(err => {
        console.error('추천 사용자 불러오기 실패:', err);
      });
  }, []);

  // “이런 사람 어때요?” (인기 멤버) API 호출
  useEffect(() => {
    getPopularMembers()
      .then(res => {
        setPopularMembers(res.data.result ?? []);
      })
      .catch(err => {
        console.error('인기 멤버 불러오기 실패:', err);
      });
  }, []);

  return (
    <>
      <HomeHeader scrollToggle />

      <div className="w-full min-h-screen bg-white font-pretendard flex justify-center">
        <div className="w-full max-w-[700px]">
          {/* 메인 배너 */}
          <section className="w-full overflow-hidden ">
            <Swiper autoplay={{ delay: 4000 }} loop slidesPerView={1}>
              <SwiperSlide>
                <div className="relative w-full h-auto">
                  <img
                    src={homeBg}
                    alt="홈 배경"
                    className="w-full h-auto object-contain"
                  />
                  {/* 배너 위 오버레이: 학교 이름 */}
                  <div className="absolute bottom-8 left-4 text-white">
                    <p className="text-[16px] font-pretendard pl-1 mb-1">{schoolName}</p>   
                    <p className="text-[16px] font-bold pl-1 mb-1">Luch With Insight!</p>   
                    <p className="text-[13px] font-pretendard  pl-1">
                      혼자 먹는 점심, 텅 빈 공간 시간...<br/>
                      이제는 비슷한 관심사를 가진 친구 혹은 선배와<br/>
                      가볍게 이야기를 나눠요!</p>   
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </section>

          {/* 관심사 카테고리 */}
          <section className="grid grid-cols-4 gap-x-[40px] gap-y-[18px] justify-items-center pt-[25px] px-[20px] mt-[25px] mb-[42px]">
            <CategoryGridItem
              icon={<ExchangeIcon />}
              label="교환학생"
              onClick={() => handleCategoryClick('교환학생')}
              textClassName="text-[13px] leading-[16px]"
            />
            <CategoryGridItem
              icon={<CareerIcon />}
              label="취업/진로"
              onClick={() => handleCategoryClick('취업/진로')}
              textClassName="text-[13px] leading-[16px]"
            />
            <CategoryGridItem
              icon={<ExamIcon />}
              label="고시준비"
              onClick={() => handleCategoryClick('고시준비')}
              textClassName="text-[13px] leading-[16px]"
            />
            <CategoryGridItem
              icon={<StartupIcon />}
              label="창업"
              onClick={() => handleCategoryClick('창업')}
              textClassName="text-[13px] leading-[16px]"
            />
            <CategoryGridItem
              icon={<GradeIcon />}
              label="학점관리"
              onClick={() => handleCategoryClick('학점관리')}
              textClassName="text-[13px] leading-[16px]"
            />
            <CategoryGridItem
              icon={<LanguageIcon />}
              label="외국어 공부"
              onClick={() => handleCategoryClick('외국어 공부')}
              textClassName="text-[13px] leading-[16px]"
            />
            <CategoryGridItem
              icon={<HobbyIcon />}
              label="취미/여가"
              onClick={() => handleCategoryClick('취미/여가')}
              textClassName="text-[13px] leading-[16px]"
            />
            <CategoryGridItem
              icon={<SchoolIcon />}
              label="학교생활"
              onClick={() => handleCategoryClick('학교생활')}
              textClassName="text-[13px] leading-[16px]"
            />
          </section>

          {/* 나와 ‘시간표 · 관심사’가 겹쳐요! */}
          <section className="pl-5 pb-6">
            <h2 className="text-[20px] font-semibold mb-4">
              나와 ‘시간표 · 관심사’가 겹쳐요!
            </h2>
            <Swiper
              className="pl-4"
              spaceBetween={16}
              breakpoints={{ 0: { slidesPerView: 2 }, 480: { slidesPerView: 3 } }}
            >
              {recommendations.map(profile => (
                <SwiperSlide key={profile.memberId}>
                  <ProfileCard
                    id={String(profile.memberId)}
                    name={profile.memberName}
                    department={`${profile.department} ${profile.studentNo}`}
                    tags={profile.userInterests}
                    image={profile.profileImageUrl}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* 이런 사람 어때요? */}
          <section className="pl-5 pb-6 mt-10">
            <h2 className="text-[20px] font-semibold mb-4">이런 사람 어때요?</h2>
            <Swiper
              className="pl-4"
              spaceBetween={16}
              breakpoints={{ 0: { slidesPerView: 2 }, 480: { slidesPerView: 3 } }}
            >
              {popularMembers.map(profile => (
                <SwiperSlide key={profile.memberId}>
                  <ProfileCard
                    id={String(profile.memberId)}
                    name={profile.memberName}
                    department={`${profile.department} ${profile.studentNo}`}
                    tags={profile.userInterests}
                    image={profile.profileImageUrl ?? '/images/profile.png'}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* 이달의 커피챗 멘토님은 누구? */}
          <section className="pl-5 pb-5 mt-10">
            <h2 className="text-[20px] font-semibold mb-4">
              이달의 커피챗 멘토님은 누구?
            </h2>
            <div className="relative rounded-xl overflow-hidden w-[335px] h-[163px] sm:w-[440px] sm:h-[163px]">
              <img
                src="/images/mento.png"
                alt="이달의 멘토 배너"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-5">
                <p className="text-[16px] font-semibold text-black">김지윤 선배님</p>
                <p className="mt-1 text-[13px] text-black opacity-90">
                  컴퓨터공학과 16학번
                </p>
                <p className="text-[12px] text-black opacity-90">
                  네이버 커머스 CIC 프론트엔드 개발자
                </p>
                <button
                  onClick={() => navigate('/monthly-mentor')}
                  className="mt-4 w-[113px] h-[26px] bg-[#FF7963] rounded-[8px] text-[12px] font-medium text-white flex items-center justify-center"
                >
                  지금 바로 신청하기
                </button>
              </div>
            </div>
          </section>

          {/* 런치챗 소개 */}
          <section className="bg-gray-50 py-6 px-4">
            <h2 className="text-[20px] font-semibold text-black mb-4">
              런치챗 소개
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                title="런치챗 소개"
                icon={<LunchatIcon className="w-[104px] h-[29px]" />}
                onClick={() =>
                  window.open(
                    'https://www.notion.so/native/1f283f3bbb0280c48b1be5c7118739f5?pvs=0&deepLinkOpenNewTab=true',
                    '_blank'
                  )
                } />
              <InfoCard
                title="자주 묻는 질문"
                icon={<QuestionIcon className="w-[104px] h-[29px]" />}
                onClick={() =>
                  window.open(
                    'https://www.notion.so/native/1f283f3bbb0280c48b1be5c7118739f5?pvs=0&deepLinkOpenNewTab=true',
                    '_blank'
                  )
                } />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
