import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
  id?: string;
  name: string;
  department: string;
  tags: string[];
  image?: string;
  icon?: React.ReactNode;
}

// 백엔드 interestType → 화면에 보여줄 한글 매핑
// eslint-disable-next-line react-refresh/only-export-components
export const INTEREST_TYPE_LABELS: Record<string, string> = {
  EXCHANGE_STUDENT: '교환학생',
  EMPLOYMENT_CAREER: '취업/진로',
  EXAM_PREPARATION: '고시준비',
  STARTUP: '창업',
  GPA_MANAGEMENT: '학점관리',
  FOREIGN_LANGUAGE_STUDY: '외국어 공부',
  HOBBY_LEISURE: '취미/여가',
  SCHOOL_LIFE: '학교생활',
};

export default function ProfileCard({ id, name, department, tags, image, icon }: ProfileCardProps) {
  const navigate = useNavigate();
  const handleClick = () => id && navigate(`/profile/${id}`);

  return (
    <div
      onClick={handleClick}
      className={`w-full bg-white rounded-2xl  ${id ? 'cursor-pointer hover:shadow-md' : ''}`}
    >
      <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 mb-3">
        {image ? (
          <img
            src={image}
            alt={`${name} 프로필`}
            className="min-w-[160px] max-w-[180px] w-full h-full object-cover"
          />
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
        {tags.map((tag, i) => (
          <span key={tag} className="flex items-center">
            <span className="text-[#7D7D7D] font-normal">{INTEREST_TYPE_LABELS[tag] ?? tag}</span>
            {i < tags.length - 1 && <span className="text-[#D4D4D4] mx-[4px]">|</span>}
          </span>
        ))}
      </p>
      <div className="flex flex-wrap gap-1 font-[pretendard]">
        {tags.map(tag => (
          <span
            key={tag}
            className="text-[10px] px-2 py-0.5 border border-[#FF5A5A] text-black rounded-full"
          >
            {INTEREST_TYPE_LABELS[tag] ?? tag}
          </span>
        ))}
      </div>
    </div>
  );
}
