// src/App.tsx
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import HomePage from './pages/Home-Page/home-page';
import MatchingListPage from './pages/matching-list-page';
import ProfileDetailPage from './pages/Profile-Detail/profile-detail-page';
import AlarmPage from './pages/alarm-page';

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
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
