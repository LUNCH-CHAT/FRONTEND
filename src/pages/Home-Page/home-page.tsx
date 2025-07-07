import { Swiper, SwiperSlide } from 'swiper/react';
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
import HomeBanner from '@/assets/icons/homebanner.svg?react';
import LunchatIcon from '@/assets/icons/lunchat.svg?react';
import QuestionIcon from '@/assets/icons/question.svg?react';

export default function HomePage() {
  return (
    <div className="w-full min-h-screen bg-white font-pretendard flex justify-center">
      <div className="w-full px-4 max-w-[700px]">
        {/* 1. 메인 배너 */}
        <section className="w-full h-[236px] overflow-hidden">
          <Swiper autoplay={{ delay: 4000 }} loop slidesPerView={1}>
            <SwiperSlide>
              <div className="relative w-full h-[236px]">
                <HomeBanner className="w-full h-full" />
                <div className="absolute inset-0 bg-black/30 flex flex-col justify-end px-6 pb-6 text-white">
                  <h2 className="text-[16px] font-bold leading-[22px] mb-1">
                    Lunch with Insight!
                  </h2>
                  <p className="text-[13px] font-medium leading-[18px] whitespace-pre-line">
                    혼자 먹는 점심, 텅 빈 공강 시간…{'\n'}
                    이제는 비슷한 관심사를 가진 친구 혹은 선배와{'\n'}
                    가볍게 이야기를 나눠요!
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </section>

        {/* 2. 관심사 카테고리 */}
        <section className="grid grid-cols-4 gap-x-[40px] gap-y-[18px] justify-items-center pt-[22px] px-[20px] mt-[34px] mb-[42px]">
          <CategoryGridItem icon={<ExchangeIcon />} label="교환학생" />
          <CategoryGridItem icon={<CareerIcon />} label="취업/진로" />
          <CategoryGridItem icon={<ExamIcon />} label="고시준비" />
          <CategoryGridItem icon={<StartupIcon />} label="창업" />
          <CategoryGridItem icon={<GradeIcon />} label="학점관리" />
          <CategoryGridItem icon={<LanguageIcon />} label="외국어 공부" />
          <CategoryGridItem icon={<HobbyIcon />} label="취미/여가" />
          <CategoryGridItem icon={<SchoolIcon />} label="학교생활" />
        </section>

        {/* 3. 추천 슬라이드 (2열 → sm 이상 3열) */}
        <section className="px-4 pb-6">
          <h2 className="text-[20px] font-semibold mb-4">
            나와 ‘시간표 · 관심사’가 겹쳐요!
          </h2>
          <div className="grid grid-cols-2 xs:grid-cols-3 gap-4">

            {[1, 2, 3].map((i) => (
              <ProfileCard
                key={i}
                id={String(i)}
                name={`유엠씨${i}`}
                department="컴퓨터공학과 21학번"
                tags={['창업', '교환학생']}
                image="/images/profile.png"
              />
            ))}
          </div>
        </section>

        {/* 4. 이런 사람 어때요? (2열 → sm 이상 3열) */}
        <section className="px-4 pb-6">
          <h2 className="text-[20px] font-semibold mb-4">이런 사람 어때요?</h2>
          <div className="grid grid-cols-2 xs:grid-cols-3 gap-4">

            {[4, 5, 6].map((i) => (
              <ProfileCard
                key={i}
                id={String(i)}
                name={`테스트${i}`}
                department="테스트 학과"
                tags={['테스트']}
                image="/images/profile.png"
              />
            ))}
          </div>
        </section>

        {/* 5. 런치챗 소개 */}
        <section className="bg-gray-50 py-6 px-4">
          <h2 className="text-[20px] font-semibold text-black mb-4">
            런치챗 소개
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <InfoCard
              title="런치챗 소개"
              icon={<LunchatIcon className="w-[101px] h-[29px]" />}
            />
            <InfoCard
              title="자주 묻는 질문"
              icon={<QuestionIcon className="w-[20px] h-[29px]" />}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
