import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import KeywordCard from '../../components/KeywordCard';
import TimeTable from '../../components/TimeTable';
import profileBg from '@/assets/images/profile-bg.png';
import sampleProfile from '@/assets/images/sample-profile.png';
import Pencil from '@/assets/icons/pencil.svg';
import { axiosInstance } from '../../api/axios';

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
  my?: boolean;
}

export default function ProfileDetailPage({ my = false }: ProfileDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const toMemberId = Number(id);
  const navigate = useNavigate();
  const timetableRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'소개' | '커피챗 가능 시간'>('소개');
  const [loading, setLoading] = useState(false);

  // 탭 전환 시 스크롤
  useEffect(() => {
    if (activeTab === '커피챗 가능 시간' && timetableRef.current) {
      timetableRef.current.scrollIntoView({ behavior: 'smooth' });
      setActiveTab('소개');
    }
  }, [activeTab]);

  // 런치챗 요청 핸들러
  const handleSendLunchChat = async () => {
    if (!toMemberId) {
      alert('유효하지 않은 멤버입니다.');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axiosInstance.post('/api/matches', { toMemberId });
      if (data.isSuccess) {
        navigate('/my/matches');
      } else {
        alert(`요청 실패: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-[pretendard]">
      {/* 헤더 */}
      <header className="relative">
        <img src={profileBg} alt="프로필 배경" className="w-full h-40 object-cover" />
        <div className="absolute top-16 w-full flex flex-col px-4">
          <img
            src={sampleProfile}
            alt="프로필"
            className="w-[140px] h-[140px] rounded-full border-4 border-white object-cover"
          />
          <div className="mt-3">
            <h2 className="text-[22px] font-bold leading-[28px] text-black">유엠씨</h2>
            <p className="text-[16px]">21학번, 컴퓨터공학과</p>
            <p className="text-[13px] text-gray-500">프로창업러 | 교환준비생 | 취미 요가</p>
            <div className="flex justify-between items-end">
              <div className="flex gap-2 mt-2 text-xs">
                <span className="px-[9px] py-[6px] rounded-full border border-[#FF706A]">창업</span>
                <span className="px-[9px] py-[6px] rounded-full border border-[#FF706A]">교환학생</span>
              </div>
              {my && (
                <button
                  type="button"
                  onClick={() => navigate(`/my/edit-tag`)}
                  className="flex gap-1 text-[13px] text-[#A0A0A0]"
                >
                  관심사 태그 수정
                  <img src={Pencil} alt="수정" className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* 구분선 */}
      <div className="mt-[180px] border-t border-[#F4F4F4]" />

      {/* 탭 */}
      <div className="flex border-b border-[#D4D4D4] px-5 gap-6">
        {(['소개', '커피챗 가능 시간'] as const).map(tab => (
          <button
            key={tab}
            className={`p-2 text-[16px] cursor-pointer ${
              activeTab === tab
                ? 'border-b-2 border-black text-black'
                : 'text-gray-400'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* 본문 */}
      <main className="flex-1">
        {/* 소개 */}
        <section className="px-5 pt-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-[20px] font-semibold">소개</h3>
            {my && (
              <button
                type="button"
                onClick={() => navigate(`/my/edit-keyword`)}
                className="flex gap-1 text-[13px] text-[#A0A0A0]"
              >
                키워드 소개 수정
                <img src={Pencil} alt="수정" className="w-3 h-3" />
              </button>
            )}
          </div>
          <p className="text-sm mb-4 font-medium">세 가지 “키워드”로 나를 소개할게요!</p>
          {mockData.map(({ id, question, keyword, text }) => (
            <KeywordCard
              key={id}
              question={question}
              keyword={keyword}
              text={text}
            />
          ))}
        </section>

        <div className="border-t border-[#F4F4F4]" />

        {/* 커피챗 가능 시간 */}
        <section ref={timetableRef} className="px-5 pt-5">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-[20px] font-semibold">런치챗 가능 시간</h3>
            {my && (
              <button
                type="button"
                onClick={() => navigate(`/my/edit-time`)}
                className="flex gap-1 text-[13px] text-[#A0A0A0]"
              >
                시간 수정
                <img src={Pencil} alt="수정" className="w-3 h-3" />
              </button>
            )}
          </div>
          <TimeTable />
        </section>
      </main>

      {/* 하단 버튼 */}
      <div className="fixed bottom-0 w-full max-w-[480px] px-5 pb-4 pt-2 bg-white border-t border-gray-200">
        {my ? (
          <button
            onClick={() => navigate(`/my/`)}
            className="w-full h-[48px] bg-[#FF7C6A] rounded-[10px] text-white font-semibold"
          >
            수정완료
          </button>
        ) : (
          <button
            onClick={handleSendLunchChat}
            disabled={loading}
            className={`w-full h-[48px] rounded-[10px] text-white font-semibold ${
              loading ? 'bg-gray-300' : 'bg-[#FF7C6A]'
            }`}
          >
            {loading ? '전송 중…' : '런치챗 보내기'}
          </button>
        )}
      </div>
    </div>
  );
}
