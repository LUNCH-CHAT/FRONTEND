// src/components/ProfileCard.tsx

interface ProfileCardProps {
  name: string;
  department: string;
  tags: string[];
  image?: string;
  icon?: React.ReactNode;
}

export default function ProfileCard({ name, department, tags, image, icon }: ProfileCardProps) {
  return (
    <div className="w-[208px] bg-white rounded-[20px] shadow-sm p-4 flex-shrink-0">
      <div className="w-[180px] h-[180px] rounded-[15px] bg-gray-100 flex items-center justify-center mb-3 overflow-hidden mx-auto">
        {image ? (
          <img
            src={image}
            alt={`${name} 프로필 이미지`}
            className="w-full h-full object-cover"
          />
        ) : (
          icon
        )}
      </div>
      <div className="text-[15px] font-semibold text-black mb-1">{name}</div>
      <div className="text-[13px] text-gray-600 mb-1">{department}</div>
      <div className="text-[12px] text-gray-400 mb-2">
        프로창업러 | 교환 준비 | 취미 요가
      </div>
      <div className="flex flex-wrap gap-1">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-[11px] px-2.5 py-0.5 border border-[#FF5A5A] text-[#FF5A5A] rounded-full"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
