import { useState } from 'react';
import TimeTable from '../../components/TimeTable';

import profileBg from '@/assets/images/profile-bg.png';
import sampleProfile from '@/assets/images/sample-profile.png';

export default function ProfileDetailPage() {
  const [activeTab, setActiveTab] = useState<'소개' | '커피챗 가능 시간'>('소개');

  return (
    <div className="min-h-screen flex flex-col bg-white font-pretendard pb-28">
      {/* 헤더 */}
      <header className="relative">
        <img
          src={profileBg}
          alt="프로필 배경"
          className="w-full h-40 object-cover"
        />

        {/* 프로필 */}
        <div className="absolute top-24 w-full flex flex-col items-center px-4">
          <img
            src={sampleProfile}
            alt="프로필"
            className="w-[140px] h-[140px] rounded-full border-4 border-white object-cover"
          />
          <div className="mt-3 text-center">
            <h2 className="text-[22px] font-bold leading-[28px] text-black font-pretendard">유엠씨</h2>
            <p className="text-[16px] font-medium text-black font-pretendard">21학번, 컴퓨터공학과</p>
            <p className="text-[13px] text-gray-500 font-pretendard">프로창업러 | 교환준비생 | 취미 요가</p>
            <div className="flex justify-center gap-2 mt-2 text-xs">
              <span className="px-3 py-0.5 rounded-full border border-[#FF706A] text-[#FF706A] font-pretendard">창업</span>
              <span className="px-3 py-0.5 rounded-full border border-gray-400 text-gray-500 font-pretendard">교환학생</span>
            </div>
          </div>
        </div>
      </header>

      {/* 탭 */}
      <div className="flex border-b mt-[220px]">
        {['소개', '커피챗 가능 시간'].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 text-[16px] font-semibold leading-[24px] font-pretendard ${
              activeTab === tab ? 'border-b-2 border-black text-black' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(tab as '소개' | '커피챗 가능 시간')}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 본문 */}
      <main className="flex-1 px-4 pt-4">
        {activeTab === '소개' ? (
          <>
            {/* 상단 제목 */}
            <h3 className="text-[20px] font-semibold text-black font-pretendard mb-2">소개</h3>

            <p className="text-sm text-gray-500 mb-4 font-pretendard">세 가지 “키워드”로 나를 소개할게요!</p>

            <div className="mb-4">
              <p className="text-[#FF706A] font-semibold text-sm mb-1 font-pretendard">지금 나를 표현한 키워드는?</p>
              <p className="text-black text-base font-semibold mb-1 font-pretendard"># 프로창업러</p>
              <p className="text-sm text-gray-700 font-pretendard">
                프로창업러, 쇼핑몰 운영 경험과 IT 개발에 관심이 많아요! 실행력이 강하고, 새로운 기획을 빠르게 현실로 만들어가는 걸 좋아합니다.
              </p>
            </div>

            <div className="mb-4">
              <p className="text-[#FF706A] font-semibold text-sm mb-1 font-pretendard">요즘 나의 목표 키워드는?</p>
              <p className="text-black text-base font-semibold mb-1 font-pretendard"># 교환 준비</p>
              <p className="text-sm text-gray-700 font-pretendard">
                북경대 교환학생 준비중인 도전형 대학생입니다! 해외 경험을 쌓고 싶어, 매일 꾸준히 중국어와 학점 관리에 힘쓰고 있어요.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-[#FF706A] font-semibold text-sm mb-1 font-pretendard">요즘 나의 최대 관심사 키워드는?</p>
              <p className="text-black text-base font-semibold mb-1 font-pretendard"># 취미 요가</p>
              <p className="text-sm text-gray-700 font-pretendard">
                요즘 취미로 요가를 배우고 있어요! 힘들지만 보람되는 취미 같아요! 혹시 요가 배우시는 분 있나요?
              </p>
            </div>
          </>
        ) : (
          <TimeTable />
        )}
      </main>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center bg-white px-4 pb-6 pt-3">
        <div className="w-full max-w-[480px]">
          <button className="w-full bg-[#FF706A] text-white py-3 rounded-xl font-semibold shadow-md font-pretendard">
            런치챗 보내기
          </button>
        </div>
      </div>
    </div>
  );
}
