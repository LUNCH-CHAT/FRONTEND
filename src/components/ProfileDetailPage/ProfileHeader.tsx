import profileBg from '@/assets/images/profile-bg.png';
import sampleProfile from '@/assets/images/sample-profile.png';
import { INTEREST_TYPE_LABELS } from '../../components/ProfileCard';
import Pencil from '@/assets/icons/pencil.svg';
import { useNavigate } from 'react-router-dom';
import type { UserKeywordDto } from '../../types/profile';
import React from 'react';

interface ProfileHeaderProps {
  profileImageUrl: string | undefined;
  memberName: string | undefined;
  studentNo: string | undefined;
  department: string | undefined;
  userKeywords: UserKeywordDto[] | undefined;
  userInterests: string[] | undefined;
  my?: boolean;
}

const ProfileHeader = ({
  profileImageUrl,
  memberName,
  studentNo,
  department,
  userKeywords,
  userInterests,
  my = false,
}: ProfileHeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="relative">
      <img src={profileBg} alt="프로필 배경" className="w-full h-40 object-cover" />
      <div className="absolute top-16 w-full flex flex-col px-4">
        <img
          src={profileImageUrl ?? sampleProfile}
          alt="프로필"
          className="w-[140px] h-[140px] rounded-full border-4 border-white object-cover"
        />
        <div className="mt-3">
          <h2 className="text-[22px] font-bold leading-[28px] text-black">{memberName ?? '—'}</h2>
          <p className="text-[16px]">{`${studentNo}학번, ${department}`}</p>
          <p className="text-[13px] text-gray-500">{userKeywords?.map(k => k.title).join(' | ')}</p>
          <div className="flex justify-between items-end">
            <div className="flex gap-2 mt-2 text-xs">
              {userInterests?.map((i, idx) => (
                <span key={idx} className="px-[9px] py-[6px] rounded-full border border-[#FF706A]">
                  {INTEREST_TYPE_LABELS[i] ?? i}
                </span>
              ))}
            </div>
            {my && (
              <button
                type="button"
                onClick={() => navigate(`/my/edit-tag`)}
                className="flex gap-1 text-[13px] text-[#A0A0A0]"
              >
                관심사 태그 수정
                <img src={Pencil} alt="수정" className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default React.memo(ProfileHeader);
