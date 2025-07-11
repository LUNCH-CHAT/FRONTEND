import { useNavigate } from 'react-router-dom';
import Back from '/src/assets/back.svg';

interface BackHeaderProps {
  title?: string;
}

const BackHeader = ({ title }: BackHeaderProps) => {
  const navigate = useNavigate();

  const handleClickBack = () => {
    navigate(-1);
  };

  return (
    <header className="max-w-[480px] w-full fixed top-0 z-50 bg-white h-[64px] flex items-center justify-center px-5">
      <button type="button" className="absolute left-5 cursor-pointer" onClick={handleClickBack}>
        <img src={Back} alt="뒤로가기" />
      </button>
      <h1 className="select-none font-[pretendard] font-semibold">{title}</h1>
    </header>
  );
};

export default BackHeader;
