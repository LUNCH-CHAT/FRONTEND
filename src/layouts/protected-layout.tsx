// import { Navigate } from 'react-router-dom';

import { matchPath, Outlet, useLocation } from 'react-router-dom';
import HomeHeader from '../components/Headers/HomeHeader';
import Navbar from '../components/Navbar';
import BackHeader from '../components/Headers/BackHeader';
import ScrollToTop from './scroll-to-top';

export default function ProtectedLayout() {
  const location = useLocation();
  const isHomePage = matchPath('/', location.pathname);
  const isAlarmPage = matchPath('/alarm', location.pathname);
  const isChattingPage = matchPath('/chatting', location.pathname);
  const isMatchingPage = matchPath('/matching', location.pathname);
  const isProfileDetailPage = matchPath('/profile/:id', location.pathname);
  const isMyPage = matchPath('/my', location.pathname);
  const isSearchPage = matchPath('/search', location.pathname);

  // if (!accessToken) {
  //   return <Navigate to={'/onboarding'} replace />;
  // }

  return (
    <>
      <ScrollToTop />
      <div className="flex items-center justify-center bg-gray-100">
        <div className="max-w-[480px] w-full min-h-screen bg-white ">
          {isHomePage && <HomeHeader />}
          {isAlarmPage && <BackHeader title="알림" />}
          {isChattingPage && <HomeHeader title="채팅" />}
          {isMatchingPage && <HomeHeader title="매칭리스트" />}
          {isProfileDetailPage && <BackHeader title="프로필 상세" />}
          {isMyPage && <HomeHeader title="마이페이지" />}
          {isSearchPage && <HomeHeader title="둘러보기" />}
          <div className="pt-[64px] pb-[80px]">
            <Outlet />
          </div>
          {isHomePage || isChattingPage || isMatchingPage || isMyPage || isSearchPage ? (
            <Navbar />
          ) : (
            ''
          )}
        </div>
      </div>
    </>
  );
}
