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
    <div className="flex justify-between px-10 py-6">
      {title ? <h1>{title}</h1> : <img src={Logo} alt="LunchChat" />}
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
