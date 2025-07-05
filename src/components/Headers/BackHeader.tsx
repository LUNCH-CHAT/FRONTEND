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
    <div className="flex justify-center items-center relative p-6">
      <button type="button" className="absolute left-10 cursor-pointer">
        <img src={Back} alt="뒤로가기" onClick={handleClickBack} />
      </button>
      <h1 className="select-none">{title}</h1>
    </div>
  );
};

export default BackHeader;
