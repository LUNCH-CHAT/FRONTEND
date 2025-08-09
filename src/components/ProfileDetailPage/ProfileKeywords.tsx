import React from 'react';
import { useNavigate } from 'react-router-dom';
import KeywordCard from '../../components/KeywordCard';
import Pencil from '@/assets/icons/pencil.svg';
import type { UserKeywordDto } from '../../types/profile';

interface ProfileKeywordsProps {
  my?: boolean;
  userKeywords: UserKeywordDto[] | undefined;
}

const ProfileKeywords = ({ my = false, userKeywords }: ProfileKeywordsProps) => {
  const navigate = useNavigate();

  return (
    <section className="px-5 pt-5">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-[20px] font-semibold">소개</h3>
        {my && (
          <button
            type="button"
            onClick={() => navigate(`/my/edit-keyword`)}
            className="flex gap-1 text-[13px] text-[#A0A0A0]"
          >
            키워드 소개 수정
            <img src={Pencil} alt="수정" className="w-3 h-3" />
          </button>
        )}
      </div>
      <p className="text-sm mb-4 font-medium">세 가지 “키워드”로 나를 소개할게요!</p>
      {userKeywords?.map(item => (
        <KeywordCard
          key={item.id}
          question={item.title}
          keyword={item.title}
          text={item.description}
        />
      ))}
    </section>
  );
};

export default React.memo(ProfileKeywords);
