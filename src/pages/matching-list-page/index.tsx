import { useEffect, useState } from 'react';
import ProfileCard from '../../components/ProfileCard';
import { useLocation } from 'react-router-dom';
import useGetInfiniteMatchingList from '../../hooks/match/useGetInfiniteMatchingList';
import { useInView } from 'react-intersection-observer';

type SelectedTab = 'ACCEPTED' | 'REQUESTED' | 'RECEIVED' | 'NONE';

export default function MatchingListPage() {
  const location = useLocation();
  const selectTab = location.state?.selectTab;

  const [selectedTab, setSelectedTab] = useState<SelectedTab>(selectTab ? selectTab : 'RECEIVED');

  const { data, isFetching, hasNextPage, isPending, isError, fetchNextPage } =
    useGetInfiniteMatchingList(selectedTab);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  if (isPending) {
    // loading spinner
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  return (
    <>
      <div className="max-w-[480px] w-full fixed top-[4rem] z-100 flex justify-between px-2 bg-[#ffffff] text-center font-[pretendard] font-normal text-[#7D7D7D]">
        <button
          type="button"
          className={`w-1/3 pb-1 ${
            selectedTab === 'RECEIVED' && 'text-[#F56156] font-bold border-[#F56156] border-b-2'
          }`}
          onClick={() => setSelectedTab('RECEIVED')}
        >
          받은요청
        </button>
        <button
          type="button"
          className={`w-1/3 pb-1 ${
            selectedTab === 'REQUESTED' && 'text-[#F56156] font-bold border-[#F56156] border-b-2'
          }`}
          onClick={() => setSelectedTab('REQUESTED')}
        >
          보낸요청
        </button>
        <button
          type="button"
          className={`w-1/3 pb-1 ${
            selectedTab === 'ACCEPTED' && 'text-[#F56156] font-bold border-[#F56156] border-b-2'
          }`}
          onClick={() => setSelectedTab('ACCEPTED')}
        >
          매칭완료
        </button>
      </div>

      <div className="mt-[27px] pt-7 px-5 grid grid-cols-2 xs:grid-cols-3 gap-3 justify-items-center gap-y-4">
        {data.pages.flatMap(page => {
          const matchUsers = page.result.data;

          return matchUsers.map(match => {
            const matchUser = match.matchedUser;

            return (
              <ProfileCard
                key={String(match.id)}
                id={String(matchUser.id)}
                name={matchUser.memberName}
                department={matchUser.department}
                tags={matchUser.userInterests.map(interest => interest.interestName)}
                image={matchUser.profileImageUrl}
              />
            );
          });
        })}
      </div>
      <div ref={ref}></div>
    </>
  );
}
