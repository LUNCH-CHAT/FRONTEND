// src/App.tsx
import './index.css';
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { lazy, Suspense, useEffect, useState, type ComponentType } from 'react';

import { onMessage } from 'firebase/messaging';
import { messaging } from './firebase/firebase';
import useFCM from './hooks/alarm/useFCM';
import ToastNoti from './components/ToastNoti';
import { LoadingSpinner } from './components/LoadingSpinner';

const PublicLayout       = lazy(() => import('./layouts/public-layout'));
const ProtectedLayout    = lazy(() => import('./layouts/protected-layout'));

const OnboardingPage     = lazy(() => import('./pages/login-page/onboarding-page'));
const ProfileStepPage    = lazy(() => import('./pages/login-page/profile-step-page'));
const ProfileCompletePage= lazy(() => import('./pages/login-page/profile-complete-page'));
const GoogleLoginPage    = lazy(() => import('./pages/login-page/redirect-page'));

const HomePage           = lazy(() => import('./pages/Home-Page/home-page'));
const MonthlyMentorPage  = lazy(() => import('./pages/Home-Page/monthly-mentor-page'));

const ChattingPage       = lazy(() => import('./pages/chatting-page'));
const ChattingRoom       = lazy(() => import('./pages/chatting-page/chatting-room'));

const MatchingListPage   = lazy(() => import('./pages/matching-list-page'));
const ProfileDetailPage  = lazy(() => import('./pages/Profile-Detail/profile-detail-page'));
const AlarmPage          = lazy(() => import('./pages/alarm-page'));
const ExplorePage        = lazy(() => import('./pages/Explore-Page/explore-page'));
const MyPage             = lazy(() => import('./pages/my-page/my-page'));

const EditTagPage        = lazy(() => import('./pages/my-page/edit-tag-page'));
const EditKeywordPage    = lazy(() => import('./pages/my-page/edit-keyword-page'));
const EditTimePage       = lazy(() => import('./pages/my-page/edit-time-page'));

const ToastContainerLazy = lazy(async () => {
  const mod = await import('react-toastify');
  await import('react-toastify/dist/ReactToastify.css');
  return { default: mod.ToastContainer };
});


type DevtoolsCmp = ComponentType<{ initialIsOpen?: boolean }>;

const publicRoutes: RouteObject[] = [
  {
    path: '/onboarding',
    element: <PublicLayout />,
    children: [
      { index: true, element: <OnboardingPage /> },
      { path: 'profile', element: <ProfileStepPage /> },
      { path: 'complete', element: <ProfileCompletePage /> },
      // { path: 'email', element: <EmailStepPage /> },
    ],
  },
  {
    path: '/auth/login/google',
    element: <PublicLayout />,
    children: [{ index: true, element: <GoogleLoginPage /> }],
  },
];

const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'alarm', element: <AlarmPage /> },
      { path: 'chatting', element: <ChattingPage /> },
      { path: 'chatting/:id', element: <ChattingRoom /> },
      { path: 'profile/:id', element: <ProfileDetailPage /> },
      { path: 'matching', element: <MatchingListPage /> },
      { path: 'explore', element: <ExplorePage /> },
      { path: 'my', element: <MyPage /> },
      { path: 'my/profile', element: <ProfileDetailPage my={true} /> },
      { path: 'my/edit-tag', element: <EditTagPage /> },
      { path: 'my/edit-keyword', element: <EditKeywordPage /> },
      { path: 'my/edit-time', element: <EditTimePage /> },
      { path: 'monthly-mentor', element: <MonthlyMentorPage /> },
      // { path: 'my/matches', element: <MyMatchesPage /> },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...protectedRoutes]);
const queryClient = new QueryClient();

function App() {
  useFCM();

  const [Devtools, setDevtools] = useState<DevtoolsCmp | null>(null);
  useEffect(() => {
    if (import.meta.env.DEV) {
      import('@tanstack/react-query-devtools').then(m =>
        setDevtools(() => m.ReactQueryDevtools)
      );
    }
  }, []);

  /**FCM 알림 수신 시점에만 react-toastify 동적 임포트 */
  useEffect(() => {
    const unsubscribe = onMessage(messaging, async payload => {
      const { title, body } = payload.data ?? {};
      if (title || body) {
        const { toast } = await import('react-toastify');
        toast(ToastNoti({ title, body }), {
          position: 'top-right',
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: 'light',
        });
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* ToastContainer를 늦게 붙여도 알림 수신 시점에 동적 임포트라 초기 번들에서 제외됩니다 */}
      <Suspense fallback={null}>
        <ToastContainerLazy />
      </Suspense>

      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<LoadingSpinner />}>
          <RouterProvider router={router} />
        </Suspense>
        {Devtools ? <Devtools initialIsOpen={false} /> : null}
      </QueryClientProvider>
    </>
  );
}

export default App;
