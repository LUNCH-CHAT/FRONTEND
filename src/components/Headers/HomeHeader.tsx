import Logo from '/src/assets/logo.svg';
import Alarm from '/src/assets/alarm.svg';
import { useNavigate } from 'react-router-dom';

interface HomeHeaderProps {
  title?: string;
}

const HomeHeader = ({ title }: HomeHeaderProps) => {
  const navigate = useNavigate();

  const handleClickAlarm = () => {
    navigate('/alarm');
  };

  return (
    <div className="max-w-[480px] w-full fixed top-0 flex justify-between px-5 py-7 z-100">
      {title ? (
        <h1 className="select-none font-[pretendard] font-semibold">{title}</h1>
      ) : (
        <h1>
          <img src={Logo} alt="LunchChat" />
        </h1>
      )}
      {!title ? (
        <button type="button" className="cursor-pointer" onClick={handleClickAlarm}>
          <img src={Alarm} alt="알림 보기" />
        </button>
      ) : (
        ''
      )}
    </div>
  );
};

export default HomeHeader;
