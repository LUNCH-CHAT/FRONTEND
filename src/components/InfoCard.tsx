// InfoCard.tsx 예시
interface InfoCardProps {
  title: string;
  icon: React.ReactNode;
  description?: string;
}

export default function InfoCard({ title, icon, description }: InfoCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm flex flex-col items-center justify-center px-4 py-6 text-center">
      <div className="mb-4">{icon}</div>
      <h3 className="text-[16px] font-semibold text-black mb-1">{title}</h3>
      {description && (
        <p className="text-[14px] text-gray-500 whitespace-pre-line leading-[20px]">
          {description}
        </p>
      )}
    </div>
  );
}
