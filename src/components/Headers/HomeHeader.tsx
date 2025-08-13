import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/assets/icons/lunchat.svg';
import Alarm from '/src/assets/alarm.svg';

interface HomeHeaderProps {
  title?: string;
  scrollToggle?: boolean;
}

export default function HomeHeader({
  title,
  scrollToggle = false,
}: HomeHeaderProps) {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!scrollToggle) return;

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // 초기 상태 체크
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollToggle]);

  const headerBgClass = scrollToggle
    ? isScrolled
      ? 'bg-white shadow-md'
      : 'bg-transparent'
    : 'bg-white'; 

  return (
    <header
      className={`
        fixed top-0 left-1/2 -translate-x-1/2 z-50
        w-full max-w-[480px] h-[64px] flex items-center justify-between
        px-5 transition-colors duration-300
        ${headerBgClass}
      `}
    >
      {title ? (
        <h1 className="font-pretendard font-semibold">{title}</h1>
      ) : (
        <button onClick={() => navigate('/')}>
          <img src={Logo} alt="LunchChat" className="h-6"/>
        </button>
      )}

      {!title && (
        <button
          type="button"
          onClick={() => navigate('/alarm')}
          className="cursor-pointer"
        >
          <img src={Alarm} alt="알림 보기" />
        </button>
      )}
    </header>
  );
}
