// src/App.tsx
import './index.css';
import { createBrowserRouter, RouterProvider, type RouteObject } from 'react-router-dom';

import PublicLayout from './layouts/public-layout';
import OnboardingPage from './pages/login-page/onboarding-page';
import EmailStepPage from './pages/login-page/email-step-page';
import ProfileStepPage from './pages/login-page/profile-step-page';
import ProfileCompletePage from './pages/login-page/profile-complete-page';

import ProtectedLayout from './layouts/protected-layout';
import HomePage from './pages/Home-Page/home-page';
import ChattingPage from './pages/chatting-page';
import MatchingListPage from './pages/matching-list-page';
import ProfileDetailPage from './pages/Profile-Detail/profile-detail-page';
import AlarmPage from './pages/alarm-page';
import ChattingRoom from './pages/chatting-page/chatting-room';

const publicRoutes: RouteObject[] = [
  {
    path: '/onboarding',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <OnboardingPage />,
      },
      {
        path: 'email',
        element: <EmailStepPage />,
      },
      {
        path: 'profile',
        element: <ProfileStepPage />,
      },
      {
        path: 'complete',
        element: <ProfileCompletePage />,
      },
    ],
  },
];

const ProtectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <ProtectedLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'alarm',
        element: <AlarmPage />,
      },
      {
        path: 'chatting',
        element: <ChattingPage />,
      },
      {
        path: 'chatting/:id',
        element: <ChattingRoom />,
      },
      {
        path: 'profile/:id',
        element: <ProfileDetailPage />,
      },
      {
        path: 'matching',
        element: <MatchingListPage />,
      },
    ],
  },
];

const router = createBrowserRouter([...publicRoutes, ...ProtectedRoutes]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
