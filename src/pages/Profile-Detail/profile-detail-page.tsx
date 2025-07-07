import { useState } from 'react';
import TimeTable from '../../components/TimeTable'; 


export default function ProfileDetailPage() {
  const [activeTab, setActiveTab] = useState<'소개' | '커피챗 가능 시간'>('소개');

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 헤더 */}
      <header className="relative">
        <img src="/images/profile-bg.png" alt="프로필 배경" className="w-full h-40 object-cover" />
        <div className="absolute top-8 left-4 text-white text-lg font-bold">←</div>
        <div className="absolute top-24 left-4 flex items-center space-x-4">
          <img
            src="/images/sample-profile.jpg"
            alt="프로필"
            className="w-20 h-20 rounded-full border-4 border-white"
          />
          <div>
            <h2 className="text-lg font-semibold">유엠씨</h2>
            <p className="text-sm text-gray-500">21학번, 컴퓨터공학과</p>
            <div className="flex flex-wrap gap-1 mt-1 text-xs text-white">
              <span className="bg-rose-400 px-2 py-0.5 rounded-full">창업</span>
              <span className="bg-gray-400 px-2 py-0.5 rounded-full">교환학생</span>
              <span className="bg-gray-400 px-2 py-0.5 rounded-full">취미 요가</span>
            </div>
          </div>
        </div>
      </header>

      {/* 탭바 */}
      <div className="flex border-b mt-4">
        {['소개', '커피챗 가능 시간'].map((tab) => (
          <button
            key={tab}
            className={`flex-1 py-2 font-semibold ${
              activeTab === tab ? 'border-b-2 border-black text-black' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(tab as '소개' | '커피챗 가능 시간')}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 본문 내용 */}
      <main className="flex-1 p-4 overflow-y-auto">
        {activeTab === '소개' ? (
          <>
            <p className="text-sm text-gray-500 mb-4">세 가지 “키워드”로 나를 소개할게요!</p>

            <div className="mb-4">
              <p className="text-red-500 font-semibold text-sm mb-1">지금 나를 표현한 키워드는?</p>
              <p className="text-black text-base font-semibold mb-1"># 프로창업러</p>
              <p className="text-sm text-gray-700">
                IT 개발에 관심이 많아요! 실행력이 강하고, 새로운 기획을 빠르게 현실로 만드는 걸 좋아합니다.
              </p>
            </div>

            <div className="mb-4">
              <p className="text-red-500 font-semibold text-sm mb-1">요즘 나의 목표 키워드는?</p>
              <p className="text-black text-base font-semibold mb-1"># 교환 준비</p>
              <p className="text-sm text-gray-700">
                북경대 교환학생 준비중! 매일 꾸준히 중어과 학점 관리에 힘쓰고 있어요.
              </p>
            </div>

            <div className="mb-6">
              <p className="text-red-500 font-semibold text-sm mb-1">요즘 나의 최대 관심사 키워드는?</p>
              <p className="text-black text-base font-semibold mb-1"># 취미 요가</p>
              <p className="text-sm text-gray-700">요가 좋아요. 혹시 같이 배워보고 싶은 분 있나요?</p>
            </div>
          </>
        ) : (
          <TimeTable />
        )}
      </main>

      {/* 하단 고정 버튼 */}
      <div className="px-4 pb-6">
        <button className="w-full bg-rose-400 text-white py-3 rounded-xl font-semibold shadow-md">
          런치챗 보내기
        </button>
      </div>
    </div>
  );
}
