import React from 'react';
import { useNavigate } from 'react-router-dom';
import KeywordCard from '../../components/KeywordCard';
import Pencil from '../../assets/icons/pencil.svg';
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
            className="flex items-center gap-1 text-[13px] text-[#A0A0A0] cursor-pointer"
          >
            키워드 소개 수정
            <img src={Pencil} alt="수정" className="w-3 h-3" />
          </button>
        )}
      </div>
      <p className="text-sm mb-4 font-medium">세 가지 “키워드”로 나를 소개할게요!</p>
      {userKeywords ? (
        <>
          <KeywordCard
            key={userKeywords[0]?.id}
            question="지금 나를 표현한 키워드는?"
            keyword={userKeywords[0]?.title}
            text={userKeywords[0]?.description}
          />
          <KeywordCard
            key={userKeywords[1]?.id}
            question="요즘 나의 목표 키워드는?"
            keyword={userKeywords[1]?.title}
            text={userKeywords[1]?.description}
          />
          <KeywordCard
            key={userKeywords[2]?.id}
            question="요즘 나의 최대 관심사 키워드는?"
            keyword={userKeywords[2]?.title}
            text={userKeywords[2]?.description}
          />
        </>
      ) : (
        <p>로딩 중…</p>
      )}
    </section>
  );
};

export default React.memo(ProfileKeywords);
