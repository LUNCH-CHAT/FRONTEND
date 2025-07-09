  interface TagSelectCardProps {
    title: string;
    icon: React.ReactNode;
    select: boolean;
    onClick:()=>void;
  }

  export default function TagSelectCard({ title, icon, select, onClick}: TagSelectCardProps) {

    return (
      <div className="flex flex-col items-center justify-between relative w-[71px] h-[86px] ">
          {select===true &&(
              <>
                  <img src="/src/assets/icons/tag-select.svg" alt="체크 이미지" className="absolute top-0 right-0 size-[25px]"/>
              </>
          )}
          <button onClick={onClick} className="size-[60px] flex items-center justify-center cursor-pointer">
              {icon}
          </button>
          <p className="text-black text-[13px] font-[pretendard] font-medium text-center">{title}</p>
      </div>
    );
  }