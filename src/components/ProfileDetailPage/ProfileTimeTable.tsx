import React from 'react';
import TimeTable from '../../components/TimeTable';
import Pencil from '../../assets/icons/pencil.svg';
import { useNavigate } from 'react-router-dom';
import type { TimeTableDto } from '../../types/profile';

interface ProfileTimeTableProps {
  my?: boolean;
  timetableRef: React.RefObject<HTMLDivElement | null>;
  timeTables: TimeTableDto[] | undefined;
}

const ProfileTimeTable = ({ my = false, timetableRef, timeTables }: ProfileTimeTableProps) => {
  const navigate = useNavigate();

  return (
    <section ref={timetableRef} className="px-5 pt-5">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-[20px] font-semibold">런치챗 가능 시간</h3>
        {my && (
          <button
            type="button"
            onClick={() => navigate(`/my/edit-time`)}
            className="flex items-center gap-1 text-[13px] text-[#A0A0A0] cursor-pointer"
          >
            시간 수정
            <img src={Pencil} alt="수정" className="w-3 h-3" />
          </button>
        )}
      </div>
      <TimeTable initialSlots={timeTables ?? []} />
    </section>
  );
};

export default React.memo(ProfileTimeTable);
