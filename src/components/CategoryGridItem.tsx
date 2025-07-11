interface CategoryGridItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void; 
}

function CategoryGridItem({ icon, label, onClick }: CategoryGridItemProps) {
  return (
    <div
      className="flex flex-col items-center w-[64px] text-center cursor-pointer"
      onClick={onClick} 
    >
      <div className="w-[40px] h-[40px] flex items-center justify-center aspect-square mb-2">
        {icon}
      </div>
      <span className="text-[13px] leading-[16px] font-[normal] text-black font-[pretendard]">
        {label}
      </span>
    </div>
  );
}

export default CategoryGridItem;
