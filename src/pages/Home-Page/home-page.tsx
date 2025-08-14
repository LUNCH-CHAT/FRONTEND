// src/pages/Home-Page/home-page.tsx
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getRecommendations, getPopularMembers } from '../../api/home';
import type { RecommendationProfile, PopularProfile } from '../../types/profile';

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
import { Autoplay } from 'swiper/modules'; 
import homeBg1 from '@/assets/images/home-bg1.png';
import homeBg2 from '@/assets/images/home-bg2.png';
import homeBg3 from '@/assets/images/home-bg3.png';

const homeBgs = [homeBg1, homeBg2, homeBg3];
const bannerTexts = [
  `혼자 먹는 점심, 텅 빈 공간 시간...
   이제는 비슷한 관심사를 가진 친구 혹은 선배와
   가볍게 이야기를 나눠요!`,
  `시간표와 관심사를 기준으로
   나와 잘 맞는 친구를 매칭해드려요!`,
  `혼밥은 그만, 점심시간에 나와 관심사가 맞는
   친구를 만나는 가장 쉬운 방법 - 런치챗`,
];

import { useMentorConfig } from '../../hooks/useMentorConfig';
import type { SchoolKey } from '../../config/school-mentor';

export default function HomePage() {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState<RecommendationProfile[]>([]);
  const [popularMembers, setPopularMembers] = useState<PopularProfile[]>([]);

  const { conf, key } = useMentorConfig() as {
    conf: { mentorName: string; mentorSub: string; mentorTitle: string };
    key: SchoolKey;
  }; 

  const displayName: Record<SchoolKey, string> = {
    한국항공대: '한국항공대학교',
    이화여대: '이화여자대학교',
    가톨릭대: '가톨릭대학교',
    UMC: 'UMC',
  };

  const handleCategoryClick = (label: string) => {
    navigate(`/explore?category=${encodeURIComponent(label)}`);
  };

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
            <Swiper modules={[Autoplay]} autoplay={{ delay: 3000 }} loop slidesPerView={1}>
              {homeBgs.map((bg, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full h-auto">
                    <img src={bg} alt={`홈 배경 ${i + 1}`} className="w-full h-auto object-contain" />
                    {/* 배너 위 오버레이: 학교 이름 */}
                    <div className="absolute bottom-8 left-4 text-white">
                      <p className="text-[16px] font-pretendard pl-1 mb-1">
                        {displayName[key] ?? ''}
                      </p>
                      <p className="text-[16px] font-bold pl-1 mb-1">Lunch With Insight!</p>
                      <p className="text-[13px] font-pretendard pl-1 whitespace-pre-line">
                        {bannerTexts[i] ?? ''}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* 관심사 카테고리 */}
          <section className="grid grid-cols-4 gap-x-[40px] gap-y-[18px] justify-items-center pt-[18px] px-[20px] mt-[25px] mb-[42px]">
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
              textClassName="text-[13px] leading-[16px] whitespace-nowrap"
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
            <h2 className="text-[20px] font-semibold mb-4">나와 ‘시간표 · 관심사’가 겹쳐요!</h2>
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
                    keywords={profile.userKeywords?.map(k => k.title) ?? []}
                    tags={profile.userInterests}
                    image={profile.profileImageUrl}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* 이런 사람 어때요? */}
          <section className="pl-5 pb-5 mt-10">
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
                    keywords={profile.userKeywords?.map(k => k.title) ?? []}
                    tags={profile.userInterests}
                    image={profile.profileImageUrl ?? '/images/profile.png'}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* 이달의 커피챗 멘토님은 누구? */}
          <section className="p-5 pb-5 mt-6">
            <h2 className="text-[20px] font-semibold mb-4">이달의 커피챗 멘토님은 누구?</h2>
            <div className="relative rounded-xl overflow-hidden w-full max-w-[480px] h-[163px]">
              <img
                src="/images/mento.png"
                alt="이달의 멘토 배너"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col justify-center px-5">
                {/* 학교별 멘토 정보 적용 */}
                <p className="text-[16px] font-semibold text-black">{conf.mentorName}</p>
                <p className="mt-1 text-[13px] text-black opacity-90">{conf.mentorSub}</p>
                <p className="text-[12px] text-black opacity-90">{conf.mentorTitle}</p>
                <button
                  onClick={() => navigate('/monthly-mentor')}
                  className="mt-4 w-[113px] h-[26px] bg-[#F56156] rounded-[8px] text-[12px] font-medium text-white flex items-center justify-center cursor-pointer hover:bg-[#e04c4c] hover:scale-105 transition-all duration-200"
                >
                  지금 바로 신청하기
                </button>
              </div>
            </div>
          </section>

          {/* 런치챗 소개 */}
          <section className="bg-gray-100 py-6 px-4">
            <h2 className="text-[20px] font-semibold text-black mb-4">런치챗 소개</h2>
            <div className="grid grid-cols-2 gap-4">
              <InfoCard
                title="런치챗 소개"
                icon={<LunchatIcon className="w-[104px] h-[29px]" />}
                onClick={() =>
                  window.open(
                    ' https://lunchchat.notion.site/24b83f3bbb028025bcbdce9088ce699d?source=copy_link',
                    '_blank'
                  )
                }
              />
              <InfoCard
                title="자주 묻는 질문"
                icon={<QuestionIcon className="w-[104px] h-[29px]" />}
                onClick={() =>
                  window.open(
                    ' https://lunchchat.notion.site/FAQ-24b83f3bbb0280d6b0ecf52cb08445ce?source=copy_link',
                    '_blank'
                  )
                }
              />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
