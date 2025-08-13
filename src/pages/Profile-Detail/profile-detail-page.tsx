// src/pages/Profile-Detail/profile-detail-page.tsx

import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { acceptMatch, getMatchingList, requestMatch } from '../../api/match';
import { getProfileDetail } from '../../api/profile';
import { type ProfileDetail } from '../../types/profile';
import ProfileHeader from '../../components/ProfileDetailPage/ProfileHeader';
import ProfileKeywords from '../../components/ProfileDetailPage/ProfileKeywords';
import ProfileTimeTable from '../../components/ProfileDetailPage/ProfileTimeTable';
import { createChatRoom } from '../../api/chat';
import { getMyDetail } from '../../api/my';
import type { MyDetail } from '../../types/user';

interface ProfileDetailPageProps {
  my?: boolean;
}

export default function ProfileDetailPage({ my = false }: ProfileDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const memberId = Number(id);
  const navigate = useNavigate();
  const timetableRef = useRef<HTMLDivElement>(null);

  const [profile, setProfile] = useState<ProfileDetail | null>(null);
  const [myProfile, setMyProfile] = useState<MyDetail>();
  const [activeTab, setActiveTab] = useState<'소개' | '런치챗 가능 시간'>('소개');
  const [hasRequested, setHasRequested] = useState(false);
  const [isReceived, setIsReceived] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // 프로필 상세 로딩
  const [isPending, setIsPending] = useState(false); // 매칭 수락 로딩

  // 1) 이미 매칭 요청이 있는지 조회
  useEffect(() => {
    (async () => {
      try {
        const res = await getMatchingList({ status: 'REQUESTED', page: 0 });
        const exists = res.result.data.some(m => m.matchedUser.id === memberId);
        setHasRequested(exists);
      } catch {
        // 조회 실패 시 무시
      }
    })();
  }, [memberId]);

  // 2) 프로필 상세 조회
  useEffect(() => {
    if (!memberId) return;
    setIsLoading(true);
    try {
      getProfileDetail(memberId).then(res => {
        if (res.data.isSuccess) {
          setProfile(res.data.result);
        }
      });
    } catch (e) {
      console.log('profile detail api error', e);
    } finally {
      setIsLoading(false);
    }
  }, [memberId]);

  useEffect(() => {
    setIsReceived(false);
    setIsMatched(false);
    if (profile?.matchStatus === 'RECEIVED') {
      setIsReceived(true);
    } else if (profile?.matchStatus === 'ACCEPTED') {
      setIsMatched(true);
    }
  }, [profile?.matchStatus]);

  // 런치챗 요청 핸들러
  const handleSendLunchChat = async () => {
    if (!memberId || hasRequested) return;
    setTimeout(() => setHasRequested(true), 1000);
    try {
      await requestMatch(memberId);
    } catch {
      setHasRequested(false);
      alert('요청 중 오류가 발생했습니다.');
    }
  };

  // 매칭 수락
  const handleAcceptMatch = async () => {
    setIsPending(true);
    try {
      const data = await acceptMatch(memberId);

      if (data.isSuccess) {
        setIsMatched(true);
        setIsReceived(false);
      }
    } catch (e) {
      console.log('accpet match error', e);
      alert('요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  // 채팅방 생성
  const handleCreateChatRoom = async () => {
    try {
      const data = await createChatRoom(memberId);

      if (data.isSuccess) {
        const chatRoomId = data.result.chatRoomId;
        navigate(`/chatting/${chatRoomId}`, {
          state: {
            name: data.result.friendName,
            friendInfo: data.result.friendDepartment,
          },
        });
      }
    } catch (e) {
      console.log('create chatroom error', e);
      alert('요청 중 오류가 발생했습니다.');
    }
  };

  // 탭 전환 시 스크롤
  useEffect(() => {
    if (activeTab === '런치챗 가능 시간' && timetableRef.current) {
      timetableRef.current.scrollIntoView({ behavior: 'smooth' });
      setActiveTab('소개');
    }
  }, [activeTab]);

  // 내 프로필 상세 조회
  useEffect(() => {
    if (my) {
      getMyDetail()
        .then(res => {
          setMyProfile(res.result);
        })
        .catch(err => console.error('나의 프로필 조회 실패', err));
    }
  }, [my]);

  const info = my ? myProfile : profile; //나의 프로필인지 아닌지 확인
  console.log(info);

  return (
    <>
      {/* loading spinner */}
      {isLoading && <div>Loading...</div>}
      <div className="min-h-screen flex flex-col bg-white font-[pretendard]">
        <ProfileHeader
          profileImageUrl={info?.profileImageUrl}
          memberName={info?.memberName}
          studentNo={info?.studentNo}
          department={info?.department}
          userKeywords={info?.userKeywords}
          userInterests={info?.userInterests}
          my={my}
        />
        <div className="mt-[180px] border-t border-[#F4F4F4] border-[7px]" />

        <div className="flex border-b border-[#D4D4D4] px-5 gap-6">
          {(['소개', '런치챗 가능 시간'] as const).map(tab => (
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
          <ProfileKeywords userKeywords={info?.userKeywords} my={my} />

          <div className="border-t border-[#F4F4F4] border-[7px]" />

          {/* 커피챗 가능 시간 */}
          <ProfileTimeTable timetableRef={timetableRef} timeTables={info?.timeTables} my={my} />
        </main>

        {/* 하단 버튼 */}
        <div className="fixed bottom-0 w-full max-w-[480px] px-5 pb-4 pt-2 bg-white border-t border-gray-200">
          {my ? (
            <button
              onClick={() => navigate(`/my/`)}
              className="w-full h-[48px] bg-[#F56156] rounded-[10px] text-white font-semibold"
            >
              수정완료
            </button>
          ) : isMatched ? (
            <button
              onClick={handleCreateChatRoom}
              className={`w-full h-[48px] rounded-[10px] text-white font-semibold
                bg-[#F56156] cursor-pointer
              `}
            >
              채팅하기
            </button>
          ) : isReceived ? (
            <button
              onClick={handleAcceptMatch}
              className={`w-full h-[48px] rounded-[10px] text-white font-semibold
                ${isPending ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#F56156] cursor-pointer'}
              `}
            >
              {isPending ? '로딩중' : '수락하기'}
            </button>
          ) : (
            <button
              onClick={handleSendLunchChat}
              disabled={hasRequested}
              className={`w-full h-[48px] rounded-[10px] text-white font-semibold ${
                hasRequested ? 'bg-gray-300 cursor-not-allowed' : 'bg-[#F56156] cursor-pointer'
              }`}
            >
              {hasRequested ? '수락 대기중' : '런치챗 보내기'}
            </button>
          )}
        </div>
      </div>
    </>
  );
}
