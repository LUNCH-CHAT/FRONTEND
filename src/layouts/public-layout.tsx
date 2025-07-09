import { matchPath, Outlet, useLocation } from 'react-router-dom';
import BackHeader from '../components/Headers/BackHeader';
import ScrollToTop from './scroll-to-top';

export default function PublicLayout() {
  const location = useLocation();

  const hideHeader =
    matchPath('/onboarding', location.pathname) ||
    matchPath('/onboarding/complete', location.pathname);

  return (
    <>
      <ScrollToTop />
      <div className="flex items-center justify-center bg-gray-100">
        <div className="max-w-[480px] w-full min-h-screen bg-white ">
          {!hideHeader && <BackHeader />}
          <div className={`${hideHeader ? '' : 'pt-[8rem]'}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}
