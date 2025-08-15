// src/App.tsx
import './index.css';
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import PublicLayout from './layouts/public-layout';
import OnboardingPage from './pages/login-page/onboarding-page';
//import EmailStepPage from './pages/login-page/email-step-page';
import ProfileStepPage from './pages/login-page/profile-step-page';
import ProfileCompletePage from './pages/login-page/profile-complete-page';

import ProtectedLayout from './layouts/protected-layout';
import HomePage from './pages/Home-Page/home-page';
import ChattingPage from './pages/chatting-page';
import ChattingRoom from './pages/chatting-page/chatting-room';
import MatchingListPage from './pages/matching-list-page';
import ProfileDetailPage from './pages/Profile-Detail/profile-detail-page';
import AlarmPage from './pages/alarm-page';
import ExplorePage from './pages/Explore-Page/explore-page';
import MyPage from './pages/my-page/my-page';

import MonthlyMentorPage from './pages/Home-Page/monthly-mentor-page';
import EditTagPage from './pages/my-page/edit-tag-page';
import EditKeywordPage from './pages/my-page/edit-keyword-page';
import EditTimePage from './pages/my-page/edit-time-page';

// import MyMatchesPage from './pages/my-page/my-matches-page';

import { useEffect } from 'react';
import { onMessage } from 'firebase/messaging';
import { messaging } from './firebase/firebase';
import GoogleLoginPage from './pages/login-page/redirect-page';
import useFCM from './hooks/alarm/useFCM';
import { toast, ToastContainer } from 'react-toastify';
import ToastNoti from './components/ToastNoti';

const publicRoutes: RouteObject[] = [
  {
    path: '/onboarding',
    element: <PublicLayout />,
    children: [
      { index: true, element: <OnboardingPage /> },
      { path: 'profile', element: <ProfileStepPage /> },
      { path: 'complete', element: <ProfileCompletePage /> },
      //{ path: 'email', element: <EmailStepPage /> },
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

  // 포그라운드 메시지 처리
  useEffect(() => {
    const unsubscribe = onMessage(messaging, payload => {
      const { title, body } = payload.data ?? {};

      if (title || body) {
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
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </>
  );
}

export default App;
