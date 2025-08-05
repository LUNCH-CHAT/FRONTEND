import { useEffect, useState } from 'react';
import ProfileCard from '../../components/ProfileCard';
import { useLocation } from 'react-router-dom';
import useGetInfiniteMatchingList from '../../hooks/match/useGetInfiniteMatchingList';
import { useInView } from 'react-intersection-observer';

type SelectedTab = 'ACCEPTED' | 'REQUESTED' | 'RECEIVED' | 'NONE';

export default function MatchingListPage() {
  const location = useLocation();
  // selectTab 단언
  const selectTab = location.state?.selectTab as SelectedTab | undefined;

  const [selectedTab, setSelectedTab] = useState<SelectedTab>(
    selectTab ?? 'RECEIVED'
  );

  const {
    data,
    isFetching,
    hasNextPage,
    isLoading,    
    isError,
    fetchNextPage,
  } = useGetInfiniteMatchingList(selectedTab);

  const { ref, inView } = useInView({ threshold: 0 });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  //  로딩/에러 체크
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error</div>;
  }
  //  data 존재 가드
  if (!data) {
    return null;
  }

  return (
    <>
      {/* 탭 */}
      <div className="max-w-[480px] w-full fixed top-[4rem] z-100 flex justify-between px-2 bg-white text-center font-[pretendard] text-[#7D7D7D]">
        <button
          className={`w-1/3 pb-1 ${
            selectedTab === 'RECEIVED' && 'text-[#FF7C6A] font-bold border-[#FF7C6A] border-b-2'
          }`}
          onClick={() => setSelectedTab('RECEIVED')}
        >
          받은요청
        </button>
        <button
          className={`w-1/3 pb-1 ${
            selectedTab === 'REQUESTED' && 'text-[#FF7C6A] font-bold border-[#FF7C6A] border-b-2'
          }`}
          onClick={() => setSelectedTab('REQUESTED')}
        >
          보낸요청
        </button>
        <button
          className={`w-1/3 pb-1 ${
            selectedTab === 'ACCEPTED' && 'text-[#FF7C6A] font-bold border-[#FF7C6A] border-b-2'
          }`}
          onClick={() => setSelectedTab('ACCEPTED')}
        >
          매칭완료
        </button>
      </div>

      {/* 카드 그리드 */}
      <div className="mt-[27px] pt-7 px-5 grid grid-cols-2 xs:grid-cols-3 gap-3 justify-items-center gap-y-4">
        {data.pages.flatMap(page =>
          page.result.matchList.map(match => {
            const u = match.matchedUser;
            return (
              <ProfileCard
                key={String(match.id)}
                id={String(u.id)}
                name={u.memberName}
                department={u.department}
                tags={u.userInterests.map(i => i.interestName)}
                image={u.profileImageUrl}
              />
            );
          })
        )}
      </div>

      {/* 무한 스크롤 트리거 */}
      <div ref={ref} />
    </>
  );
}
