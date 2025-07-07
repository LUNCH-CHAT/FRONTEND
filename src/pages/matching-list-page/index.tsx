import { useState } from 'react';
// import HomeHeader from '../../components/Headers/HomeHeader';
// import Navbar from '../../components/Navbar';
import ProfileCard from '../../components/ProfileCard';

export default function MatchingListPage() {
  const [selectedTab, setSelectedTab] = useState<'received' | 'sent' | 'matched'>('received');

  return (
    <div className="pt-[5rem]">
      {/* <HomeHeader title="매칭리스트" /> */}
      <div className="max-w-[480px] w-full fixed top-[4rem] z-100 flex justify-between px-2 bg-[#ffffff] text-center font-[pretendard] font-normal text-[#7D7D7D]">
        <button
          type="button"
          className={`w-1/3 pb-1 ${
            selectedTab === 'received' && 'text-[#000000] font-semibold border-black border-b-2'
          }`}
          onClick={() => setSelectedTab('received')}
        >
          받은요청
        </button>
        <button
          type="button"
          className={`w-1/3 pb-1 ${
            selectedTab === 'sent' && 'text-[#000000] font-semibold border-black border-b-2'
          }`}
          onClick={() => setSelectedTab('sent')}
        >
          보낸요청
        </button>
        <button
          type="button"
          className={`w-1/3 pb-1 ${
            selectedTab === 'matched' && 'text-[#000000] font-semibold border-black border-b-2'
          }`}
          onClick={() => setSelectedTab('matched')}
        >
          매칭완료
        </button>
      </div>
      <div className="pt-5 grid grid-cols-2 xs:grid-cols-3 gap-2 justify-items-center">
        <ProfileCard
          name="유엠씨"
          department="컴퓨터공학과 21학번"
          tags={['창업', '교환학생']}
          image="/images/profile.png"
        />
        <ProfileCard
          name="유엠씨"
          department="컴퓨터공학과 21학번"
          tags={['창업', '교환학생']}
          image="/images/profile.png"
        />
        <ProfileCard
          name="유엠씨"
          department="컴퓨터공학과 21학번"
          tags={['창업', '교환학생']}
          image="/images/profile.png"
        />
        <ProfileCard
          name="유엠씨"
          department="컴퓨터공학과 21학번"
          tags={['창업', '교환학생']}
          image="/images/profile.png"
        />
        <ProfileCard
          name="유엠씨"
          department="컴퓨터공학과 21학번"
          tags={['창업', '교환학생']}
          image="/images/profile.png"
        />
        <ProfileCard
          name="유엠씨"
          department="컴퓨터공학과 21학번"
          tags={['창업', '교환학생']}
          image="/images/profile.png"
        />
      </div>
      {/* <Navbar /> */}
    </div>
  );
}
