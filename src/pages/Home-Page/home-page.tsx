// src/pages/Home-Page/home-page.tsx

import { useNavigate } from 'react-router-dom';
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
import homeBg from '@/assets/images/home-bg.png';

export default function HomePage() {
  const navigate = useNavigate();

  const handleCategoryClick = (label: string) => {
    navigate(`/explore?category=${encodeURIComponent(label)}`);
  };

  return (
    <>
      {/* 고정 헤더: 홈 페이지만 scrollToggle 활성화 */}
      <HomeHeader scrollToggle />

      <div className="w-full min-h-screen bg-white font-pretendard flex justify-center">
        
        <div className="w-full max-w-[700px]">
          {/* 메인 배너 (고정 높이 제거, 비율 유지) */}
          <section className="w-full overflow-hidden">
            <Swiper autoplay={{ delay: 4000 }} loop slidesPerView={1}>
              <SwiperSlide>
                <img
                  src={homeBg}
                  alt="홈 배경"
                  className="w-full h-auto object-contain"
                />
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

          {/* 나와 ‘시간표 · 관심사’가 겹쳐요 */}
          <section className="pl-5 pb-6">
            <h2 className="text-[20px] font-semibold mb-4">
              나와 ‘시간표 · 관심사’가 겹쳐요!
            </h2>
            <Swiper
              className="pl-4"
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 2 },
                480: { slidesPerView: 3 },
              }}
            >
              {[1, 2, 3].map(i => (
                <SwiperSlide key={i}>
                  <ProfileCard
                    id={String(i)}
                    name={`유엠씨${i}`}
                    department="컴퓨터공학과 21학번"
                    tags={['창업', '교환학생']}
                    image="/images/profile.png"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </section>

          {/* 이런 사람 어때요? */}
          <section className="pl-5 pb-6 mt-10">
            <h2 className="text-[20px] font-semibold mb-4">
              이런 사람 어때요?
            </h2>
            <Swiper
              className="pl-4"
              spaceBetween={16}
              breakpoints={{
                0: { slidesPerView: 2 },
                480: { slidesPerView: 3 },
              }}
            >
              {[4, 5, 6].map(i => (
                <SwiperSlide key={i}>
                  <ProfileCard
                    id={String(i)}
                    name={`테스트${i}`}
                    department="테스트 학과"
                    tags={['테스트']}
                    image="/images/profile.png"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
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
                }
              />
              <InfoCard
                title="자주 묻는 질문"
                icon={<QuestionIcon className="w-[104px] h-[29px]" />}
                onClick={() =>
                  window.open(
                    'https://www.notion.so/native/1f283f3bbb0280c48b1be5c7118739f5?pvs=0&deepLinkOpenNewTab=true',
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