// src/App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import HomePage from './pages/Home-Page/home-page';
import MatchingListPage from './pages/matching-list-page';
import ProfileDetailPage from './pages/Profile-Detail/profile-detail-page';
import AlarmPage from './pages/alarm-page';
import ChattingPage from './pages/chatting-page';
import ChattingRoom from './pages/chatting-page/chatting-room';
import EmailStepPage from './pages/login-page/email-step-page';
import ProfileStepPage from './pages/login-page/profile-step-page';
import ProfileCompletePage from './pages/login-page/profile-complete-page';
import OnboardingPage from './pages/login-page/onboarding-page';

function App() {
  return (
    <BrowserRouter>
      <div className="flex items-center justify-center bg-gray-100">
        <div className="max-w-[480px] w-full min-h-screen space-y-8 bg-white">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/matching" element={<MatchingListPage />} />
            <Route path="/profile/:id" element={<ProfileDetailPage />} />
            <Route path="/alarm" element={<AlarmPage />} />
            <Route path="chatting" element={<ChattingPage />} />
            <Route path="chatting/:id" element={<ChattingRoom />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/onboarding/email" element={<EmailStepPage />} />
            <Route path="/onboarding/profile" element={<ProfileStepPage />} />
            <Route path="/onboarding/complete" element={<ProfileCompletePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
