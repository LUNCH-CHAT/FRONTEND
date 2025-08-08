interface KeywordCardProps {
  question: string;
  keyword?: string;
  text?: string;
}

export default function KeywordCard({
  question,
  keyword = '',
  text = '',
}: KeywordCardProps) {

  const finalKeyword = keyword.trim() === '' ? '아직 등록된 키워드가 없어요' : keyword;
  const finalText = text.trim() === '' ? '등록된 설명이 없어요' : text;

  return (
    <div className="border-l-2 border-[#FF7C6A] mb-5 pl-3">
      <p className="text-[#FF7C6A] text-[13px] font-[pretendard] font-medium text-sm pb-[9px]">
        {question}
      </p>
      <p className="text-black text-[16px] font-[pretendard] font-semibold pb-[7px]"># {finalKeyword}</p>
      <p className="text-black text-[13px] font-[pretendard] font-regular">{finalText}</p>
    </div>
  );
}
