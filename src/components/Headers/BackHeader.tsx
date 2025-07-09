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
    <div className="max-w-[480px] w-full fixed top-0 flex justify-center items-center pt-18 pb-5 z-50 bg-[#ffffff]">
      <button type="button" className="absolute left-5 cursor-pointer">
        <img src={Back} alt="뒤로가기" onClick={handleClickBack} />
      </button>
      <h1 className="select-none font-[pretendard] font-semibold">{title}</h1>
    </div>
  );
};

export default BackHeader;
