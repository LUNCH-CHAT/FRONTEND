// src/pages/Profile-Detail/profile-detail-page.tsx

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import KeywordCard from '../../components/KeywordCard';
import TimeTable from '../../components/TimeTable';
import profileBg from '@/assets/images/profile-bg.png';
import sampleProfile from '@/assets/images/sample-profile.png';
import Pencil from '@/assets/icons/pencil.svg';
import { INTEREST_TYPE_LABELS } from '../../components/ProfileCard';
import { getMatchingList, requestMatch } from '../../api/match';
import { getProfileDetail } from '../../api/profile';
import type { ProfileDetail } from '../../types/profile';

interface ProfileDetailPageProps {
  my?: boolean;
}

export default function ProfileDetailPage({ my = false }: ProfileDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const toMemberId = Number(id);
  const navigate = useNavigate();
  const timetableRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<ProfileDetail | null>(null);
  const [activeTab, setActiveTab] = useState<'소개' | '커피챗 가능 시간'>('소개');
  const [hasRequested, setHasRequested] = useState(false);

  // 1) 이미 매칭 요청이 있는지 조회
  useEffect(() => {
    (async () => {
      try {
        const res = await getMatchingList({ status: 'REQUESTED', page: 0 });
        const exists = res.result.data.some(m => m.matchedUser.id === toMemberId);
        setHasRequested(exists);
      } catch {
        // 조회 실패 시 무시
      }
    })();
  }, [toMemberId]);

  // 2) 프로필 상세 조회
  useEffect(() => {
    if (!toMemberId) return;
    getProfileDetail(toMemberId)
      .then(res => {
        if (res.data.isSuccess) setProfile(res.data.result);
      })
      .catch(err => console.error('프로필 조회 실패', err));
  }, [toMemberId]);

  // 탭 전환 시 스크롤
  useEffect(() => {
    if (activeTab === '커피챗 가능 시간' && timetableRef.current) {
      timetableRef.current.scrollIntoView({ behavior: 'smooth' });
      setActiveTab('소개');
    }
  }, [activeTab]);

  // 런치챗 요청 핸들러
  const handleSendLunchChat = async () => {
    if (!toMemberId || hasRequested) return;
    setTimeout(() => setHasRequested(true), 1000);
    try {
      await requestMatch(toMemberId);
    } catch {
      setHasRequested(false);
      alert('요청 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-[pretendard]">
      <header className="relative">
        <img src={profileBg} alt="프로필 배경" className="w-full h-40 object-cover" />
        <div className="absolute top-16 w-full flex flex-col px-4">
          <img
            src={profile?.profileImageUrl ?? sampleProfile}
            alt="프로필"
            className="w-[140px] h-[140px] rounded-full border-4 border-white object-cover"
          />
          <div className="mt-3">
            <h2 className="text-[22px] font-bold leading-[28px] text-black">
              {profile?.memberName ?? '—'}
            </h2>
            <p className="text-[16px]">
              {profile ? `${profile.studentNo}학번, ${profile.department}` : ''}
            </p>
            <p className="text-[13px] text-gray-500">
              {profile?.userKeywords.map(k => k.title).join(' | ')}
            </p>
            <div className="flex justify-between items-end">
              <div className="flex gap-2 mt-2 text-xs">
                {profile?.userInterests.map((i, idx) => (
                  <span
                    key={idx}
                    className="px-[9px] py-[6px] rounded-full border border-[#FF706A]"
                  >
                    {INTEREST_TYPE_LABELS[i] ?? i}
                  </span>
                ))}
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

      <div className="mt-[180px] border-t border-[#F4F4F4]" />

      <div className="flex border-b border-[#D4D4D4] px-5 gap-6">
        {(['소개', '커피챗 가능 시간'] as const).map(tab => (
          <button
            key={tab}
            className={`p-2 text-[16px] cursor-pointer ${
              activeTab === tab ? 'border-b-2 border-black text-black' : 'text-gray-400'
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
          {profile ? (
            profile.userKeywords.map(item => (
              <KeywordCard
                key={item.id}
                question={item.title}
                keyword={item.title}
                text={item.description}
              />
            ))
          ) : (
            <p>로딩 중…</p>
          )}
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
          <TimeTable initialSlots={profile?.timeTables ?? []} />
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
            disabled={hasRequested}
            className={`w-full h-[48px] rounded-[10px] text-white font-semibold ${
              hasRequested ? 'bg-gray-300' : 'bg-[#FF7C6A]'
            }`}
          >
            {hasRequested ? '수락 대기중' : '런치챗 보내기'}
          </button>
        )}
      </div>
    </div>
  );
}
