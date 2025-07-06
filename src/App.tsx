// src/App.tsx
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import HomePage from './pages/Home-Page/home-page';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-[480px] w-full space-y-8 bg-white">
          <HomePage />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
