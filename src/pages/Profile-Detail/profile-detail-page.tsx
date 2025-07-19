import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import KeywordCard from '../../components/KeywordCard';
import TimeTable from '../../components/TimeTable';
import profileBg from '@/assets/images/profile-bg.png';
import sampleProfile from '@/assets/images/sample-profile.png';
import Pencil from '@/assets/icons/pencil.svg';

const mockData = [
  {
    id: 1,
    question: '지금 나를 표현한 키워드는?',
    keyword: '프로창업러',
    text: '프로창업러, 쇼핑몰 운영 경험과 IT 개발에 관심이 많아요! 실행력이 강하고, 새로운 기획을 빠르게 현실로 만들어가는 걸 좋아합니다.',
  },
  {
    id: 2,
    question: '요즘 나의 목표 키워드는?',
    keyword: '교환 준비',
    text: '북경대 교환학생 준비중인 도전형 대학생입니다! 해외 경험을 쌓고 싶어, 매일 꾸준히 중국어와 학점 관리에 힘쓰고 있어요.',
  },
  {
    id: 3,
    question: '요즘 나의 최대 관심사 키워드는?',
    keyword: '취미 요가',
    text: '요즘 취미로 요가를 배우고 있어요! 힘들지만 보람되는 취미 같아요! 혹시 요가 배우시는 분 있나요?',
  },
];

interface ProfileDetailPageProps {
  my?: boolean; // 선택적 prop으로 표시
}

export default function ProfileDetailPage({ my=false } : ProfileDetailPageProps) {
  const [activeTab, setActiveTab] = useState<'소개' | '커피챗 가능 시간'>('소개');
  const navigate = useNavigate();
  const timetableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === '커피챗 가능 시간' && timetableRef.current) {
      timetableRef.current.scrollIntoView({ behavior: 'smooth' });
      setActiveTab('소개');
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-white font-[pretendard] ">
      {/* 헤더 */}
      <header className="relative">
        <img src={profileBg} alt="프로필 배경" className="w-full h-40 object-cover" />

        {/* 프로필 */}
        <div className="absolute top-16 w-full flex flex-col px-4">
          <img
            src={sampleProfile}
            alt="프로필"
            className="w-[140px] h-[140px] rounded-full border-4 border-white object-cover"
          />
          <div className="mt-3">
            <h2 className="text-[22px] font-bold leading-[28px] text-black font-[pretendard]">
              유엠씨
            </h2>
            <p className="text-[16px] font-regular text-black font-[pretendard]">
              21학번, 컴퓨터공학과
            </p>
            <p className="text-[13px] text-gray-500 font-regular font-[pretendard]">
              프로창업러 | 교환준비생 | 취미 요가
            </p>
            <div className="flex justify-between items-end">
              <div className="flex gap-2 mt-2 text-xs">
                <span className="px-[9px] py-[6px] rounded-full border border-[#FF706A] text-black font-[pretendard] font-light font-[13px] ">
                  창업
                </span>
                <span className="px-[9px] py-[6px] rounded-full border border-[#FF706A] text-black font-[pretendard] font-light font-[13px]">
                  교환학생
                </span>
              </div>
              { my && (
                <button
                  type="button"
                  onClick={() => navigate(`/my/edit-tag`)}
                  className="flex gap-[5px] text-[13px] text-[#A0A0A0] font-[pretendard] font-light leading-[11px] cursor-pointer"
                >
                  관심사 태그 수정
                  <img src={Pencil} alt="수정" className="size-[10px]" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/*  구분선 */}
      <div className="mt-[180px] border-3 border-[#F4F4F4]"></div>

      {/* 탭 */}
      <div className="flex border-b border-[#D4D4D4] px-5 gap-6">
        {['소개', '커피챗 가능 시간'].map(tab => (
          <button
            key={tab}
            className={`p-2.5 py-2 pt-4 text-[16px] font-normal leading-[24px] font-[pretendard] cursor-pointer ${
              '소개' === tab ? 'border-b-2 border-black text-black' : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(tab as '소개' | '커피챗 가능 시간')}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 본문 */}
      <main>
        <>
          <div className="flex-1 px-5 pt-5">
            {/* 상단 제목 */}
            <div className="flex justify-between items-center">
              <h3 className="text-[20px] font-semibold text-black font-[pretendard] mb-2">소개</h3>
              { my && (
                <button
                  type="button"
                  onClick={() => navigate(`/my/edit-keyword`)}
                  className="flex gap-[5px] text-[13px] text-[#A0A0A0] font-[pretendard] font-light leading-[11px] cursor-pointer"
                >
                  키워드 소개 수정
                  <img src={Pencil} alt="수정" className="size-[10px]" />
                </button>
              )}
            </div>
            <p className="text-sm text-black mb-4 font-[pretendard] font-medium">
              세 가지 “키워드”로 나를 소개할게요!
            </p>

            {mockData?.map(data => (
              <KeywordCard
                key={data.id}
                question={data.question}
                keyword={data.keyword}
                text={data.text}
              />
            ))}
          </div>
          <div className="border-3 border-[#F4F4F4]"></div>
          <div ref={timetableRef} className="flex-1 px-5 pt-5">
            <div className="flex justify-between items-center">
              <h3 className="text-[20px] font-semibold text-black font-[pretendard] mb-2">
                런치챗 가능 시간
              </h3>
              { my && (
                <button
                  type="button"
                  onClick={() => navigate(`/my/edit-time`)}
                  className="flex gap-[5px] text-[13px] text-[#A0A0A0] font-[pretendard] font-light leading-[11px] cursor-pointer"
                >
                  시간 수정
                <img src={Pencil} alt="수정" className="size-[10px]" />
                </button>
              )}
            </div>
            <TimeTable />
          </div>
        </>
      </main>

      {/* 하단 버튼 */}
      <div className="fixed w-full max-w-[480px] bottom-0 px-5 pb-4 pt-[10px] bg-white border-t border-gray-200">
        { my ? (
          <button
            onClick={() => navigate(`/my/`)}
            className="w-full h-[48px] bg-[#FF7C6A] rounded-[10px] text-center text-white font-[pretendard] font-semibold cursor-pointer"
          >
            수정완료
          </button>
        ) : (
          <button
            className="w-full h-[48px] bg-[#FF7C6A] rounded-[10px] text-center text-white font-[pretendard] font-semibold cursor-pointer"
          >
            런치챗 보내기 
          </button>
        )}
      </div>
    </div>
  );
}
