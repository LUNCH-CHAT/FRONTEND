interface KeywordCardProps {
  question: string;
  keyword?: string;
  text?: string;
}

export default function KeywordCard({
  question,
  keyword = '아직 등록된 키워드가 없어요',
  text = '등록된 설명이 없어요',
}: KeywordCardProps) {
  return (
    <div className="border-l-2 border-[#FF7C6A] mb-5 pl-3">
      <p className="text-[#FF7C6A] text-[13px] font-[pretendard] font-medium text-sm pb-[9px]">
        {question}
      </p>
      <p className="text-black text-[16px] font-[pretendard] font-semibold pb-[7px]"># {keyword}</p>
      <p className="text-black text-[13px] font-[pretendard] font-regular">{text}</p>
    </div>
  );
}
