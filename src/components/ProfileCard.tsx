import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
  id?: string;
  name: string;
  department: string;
  tags: string[];
  image?: string;
  icon?: React.ReactNode;
}

export default function ProfileCard({
  id,
  name,
  department,
  tags,
  image,
  icon,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const handleClick = () => id && navigate(`/profile/${id}`);

  return (
    <div
      onClick={handleClick}
      className={`bg-white rounded-2xl shadow p-4 ${
        id ? 'cursor-pointer hover:shadow-md' : ''
      }`}
    >
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
        {image ? (
          <img
            src={image}
            alt={`${name} 프로필`}
            className="w-full h-full object-cover"
          />
        ) : (
          icon
        )}
      </div>
      <h3 className="text-sm font-[semibold] text-black mb-1">{name}</h3>
      <p className="text-xs text-gray-600 mb-1">{department}</p>
      <p className="text-xs text-gray-400 mb-2">{tags.join(' | ')}</p>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="text-[10px] px-2 py-0.5 border border-[#FF5A5A] text-black rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
