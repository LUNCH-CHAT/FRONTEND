import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
  id?: string;
  name: string;
  department: string;
  tags: { id: number; interestName: string }[];
  image?: string;
  icon?: React.ReactNode;
}

export default function ProfileCard({ id, name, department, tags, image, icon }: ProfileCardProps) {
  const navigate = useNavigate();
  const handleClick = () => id && navigate(`/profile/${id}`);

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-2xl  ${id ? 'cursor-pointer hover:shadow-md' : ''}`}
    >
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
        {image ? (
          <img src={image} alt={`${name} 프로필`} className="w-full h-full object-cover" />
        ) : (
          icon
        )}
      </div>
      <h3 className="text-base font-semibold leading-4 text-black mb-1 font-[pretendard]">
        {name}
      </h3>
      <p className="text-[13px] leading-[13px] font-normal text-black mb-1 font-[pretendard]">
        {department}
      </p>
      <p className="flex text-xs leading-4 mb-2 font-[pretendard]">
        {tags.map(tag => (
          <span key={tag.id} className="flex items-center">
            <span className="text-[#7D7D7D] font-normal">{tag.interestName}</span>
            {tag.id < tags.length - 1 && <span className="text-[#D4D4D4] mx-[4px]">|</span>}
          </span>
        ))}
      </p>
      <div className="flex flex-wrap gap-1 font-[pretendard]">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="text-[10px] px-2 py-0.5 border border-[#FF5A5A] text-black rounded-full"
          >
            {tag.interestName}
          </span>
        ))}
      </div>
    </div>
  );
}
