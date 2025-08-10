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
          <div className="w-[140px] h-[140px] relative">
            <img
              src={profileImageUrl ?? sampleProfile}
              alt="프로필"
              className="rounded-full object-cover"
            />
            {my && (
              <button className="absolute bottom-0 right-0 w-10 h-10 flex items-center justify-center bg-white rounded-full cursor-pointer">
                <div className="border border-[#A0A0A0] rounded-full w-9 h-9 flex items-center justify-center">
                  <img src={Pencil} alt="수정" className="w-5 h-5"/>
                </div>
              </button>
            )}
          </div>
          <div className="mt-3">
            <h2 className="text-[22px] font-semibold leading-5">{memberName ?? '—'}</h2>
            <p className="text-[16px] font-regular leading-4 mt-[9px]">{`${studentNo}학번, ${department}`}</p>
            <p className="text-[13px] text-gray-500 font-regular leading-4 mt-[7px]">
              {userKeywords?.filter(k => k.title.trim() !=='').map(k => k.title).join(' | ')}
            </p>
            <div className="flex justify-between items-end">
              <div className="flex gap-2 mt-3">
                {userInterests?.map((i, idx) => (
                  <span key={idx} className="px-[9px] py-[6px] rounded-full border border-[#FF706A] text-[13px] font-light">
                    {INTEREST_TYPE_LABELS[i] ?? i}
                  </span>
                ))}
              </div>
              {my && (
                <button
                  type="button"
                  onClick={() => navigate(`/my/edit-tag`)}
                  className="flex items-center gap-1 text-[13px] text-[#A0A0A0] cursor-pointer"
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
