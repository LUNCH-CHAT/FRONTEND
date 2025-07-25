// src/layouts/protected-layout.tsx

import { matchPath, Outlet, useLocation } from 'react-router-dom';
import HomeHeader from '../components/Headers/HomeHeader';
import BackHeader from '../components/Headers/BackHeader';
import Navbar from '../components/Navbar';
import ScrollToTop from './scroll-to-top';
import { NavProvider, useNav } from '../context/NavContext';
import type { JSX } from 'react';

function LayoutContent() {
  const location = useLocation();
  const {
    hideNav,
  } = useNav();

  const isHomePage          = !!matchPath('/',            location.pathname);
  const isAlarmPage         = !!matchPath('/alarm',       location.pathname);
  const isChattingPage      = !!matchPath('/chatting',    location.pathname);
  const isMatchingPage      = !!matchPath('/matching',    location.pathname);
  const isProfileDetailPage = !!matchPath('/profile/:id', location.pathname);
  const isMyPage            = !!matchPath('/my',          location.pathname);
  const isExplorePage       = !!matchPath('/explore',     location.pathname);
  const isMyDetailPage      = !!matchPath('/my/profile',  location.pathname);
  const isEditTagPage       = !!matchPath('/my/edit-tag',     location.pathname);
  const isEditKeywordPage   = !!matchPath('/my/edit-keyword', location.pathname);
  const isEditTimePage      = !!matchPath('/my/edit-time',    location.pathname);


  let header: JSX.Element | null = null;
  if (isHomePage)          header = <HomeHeader scrollToggle />;
  else if (isAlarmPage)    header = <BackHeader title="알림" />;
  else if (isChattingPage) header = <HomeHeader title="채팅" />;
  else if (isMatchingPage) header = <HomeHeader title="매칭리스트" />;
  else if (isProfileDetailPage) header = <BackHeader title="프로필 상세" />;
  else if (isMyPage)       header = <HomeHeader title="마이페이지" />;
  else if (isExplorePage)  header = <HomeHeader title="둘러보기" />;
  else if (isMyDetailPage)    header = <BackHeader title="나의 프로필" />;
  else if (isEditTagPage
        || isEditKeywordPage
        || isEditTimePage)    header = <BackHeader />;


  const showNavbar =
    (isHomePage || isChattingPage || isMatchingPage || isMyPage || isExplorePage)
    && !hideNav;

  return (
    <>
      <ScrollToTop />
      <div className="flex items-center justify-center bg-gray-100">
        <div className={`max-w-[480px] w-full min-h-screen ${isHomePage ? 'bg-transparent' : 'bg-white'}`}>
          {header}

          <div className={`pb-[80px] ${isHomePage ? '' : 'pt-[64px]'}`}>
            <Outlet />
          </div>

          {showNavbar && <Navbar />}
        </div>
      </div>
    </>
  );
}

export default function ProtectedLayout() {
  return (
    <NavProvider>
      <LayoutContent />
    </NavProvider>
  );
}
