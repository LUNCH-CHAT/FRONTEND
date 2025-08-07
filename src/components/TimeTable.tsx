// src/components/TimeTable.tsx

import React, { useEffect, useRef, useState } from 'react';
import type { TimeTable as TimeTableType } from '../types/user';

type Day = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

interface TimeSlot {
  day: Day;
  time: string;
}

interface TimeTableProps {
  
  isEditable?: boolean;
  onChange?: (slots: TimeTableType[]) => void;
  initialSlots?: TimeTableType[];
}

const days: Day[] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

const times = [
  '10:00~11:00',
  '11:00~12:00',
  '12:00~13:00',
  '13:00~14:00',
  '14:00~15:00',
  '15:00~16:00',
  '16:00~17:00',
  '17:00~18:00',
  '18:00~19:00',
  '19:00~20:00',
];

const TimeTable = ({
  isEditable = false,
  onChange,
  initialSlots = [],
}: TimeTableProps) => {

  // initialSlots(TimeTableType[])를 TimeSlot[]로 매핑해서 초기 상태로 사용
  const [selectedSlots, setselectedSlots] = useState<TimeSlot[]>([]);
  useEffect(() =>{
    setselectedSlots(
      initialSlots.map(slot => ({
      day: slot.dayOfWeek as Day,
      time: `${slot.startTime.slice(0,5)}~${slot.endTime.slice(0,5)}`,
      }))
    );
  },[initialSlots]);

  const isPointerDownRef = useRef(false);
  const touchedSlotsRef = useRef<Set<string>>(new Set());

  // TimeSlot[] → TimeTableType[] 변환 함수
  const changeSlotType = (slots: TimeSlot[]): TimeTableType[] =>
    slots.map(slot => {
      const [startTime, endTime] = slot.time.split('~');
      return {
        dayOfWeek: slot.day,
        startTime,
        endTime,
        subjectName: '', //필요하면 채우기
      };
    });

  // selectedSlots 변경 시 onChange 호출
  useEffect(() => {
    onChange?.(changeSlotType(selectedSlots));
  }, [selectedSlots, onChange]);

  const toggleSlot = (day: Day, time: string) => {
    const exists = selectedSlots.some(s => s.day === day && s.time === time);
    if (exists) {
      setselectedSlots(prev => prev.filter(s => !(s.day === day && s.time === time)));
    } else {
      setselectedSlots(prev => [...prev, { day, time }]);
    }
  };

  // 화면 좌표에서 요일/시간 추출
  const getCellFromPoint = (x: number, y: number): TimeSlot | null => {
    const el = document.elementFromPoint(x, y) as HTMLElement | null;
    if (el?.dataset.day && el?.dataset.time) {
      return { day: el.dataset.day as Day, time: el.dataset.time };
    }
    return null;
  };

  // 포인터 이벤트 핸들러
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    touchedSlotsRef.current.clear();
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (cell) {
      const key = `${cell.day}-${cell.time}`;
      touchedSlotsRef.current.add(key);
      toggleSlot(cell.day, cell.time);
    }
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isPointerDownRef.current) return;
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (cell) {
      const key = `${cell.day}-${cell.time}`;
      if (!touchedSlotsRef.current.has(key)) {
        touchedSlotsRef.current.add(key);
        toggleSlot(cell.day, cell.time);
      }
    }
  };
  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    touchedSlotsRef.current.clear();
  };

  return (
    <div
      onPointerDown={isEditable ? handlePointerDown : undefined}
      onPointerMove={isEditable ? handlePointerMove : undefined}
      onPointerUp={isEditable ? handlePointerUp : undefined}
      onPointerLeave={isEditable ? handlePointerUp : undefined}
      className="select-none touch-none"
    >
      <div
        role="table"
        className="grid gap-0.5 text-xs grid-cols-[50px_repeat(5,1fr)] mobile-sm:grid-cols-[87px_repeat(5,1fr)]"
      >
        <div role="columnheader" className="border border-[#969696] p-2 rounded-tl-md" />
        {days.map(day => (
          <div
            role="columnheader"
            key={day}
            className={`border border-[#969696] p-2 font-[pretendard] font-medium text-sm text-center ${
              day === 'FRI' ? 'rounded-tr-md' : ''
            }`}
          >
            {day}
          </div>
        ))}

        {times.map((time, idx) => (
          <React.Fragment key={time}>
            <div
              role="rowheader"
              className={`border border-[#969696] p-2 py-3 text-[10px] break-all mobile-sm:text-xs text-center font-[pretendard] text-[#969696] ${
                idx === times.length - 1 ? 'rounded-bl-md' : ''
              }`}
            >
              {time}
            </div>
            {days.map(day => {
              const isSelected = selectedSlots.some(s => s.day === day && s.time === time);
              return (
                <div
                  role="cell"
                  key={`${day}-${time}`}
                  data-day={day}
                  data-time={time}
                  className={`border border-[#969696] ${
                    isSelected
                      ? 'bg-[#FF7C6A]'
                      : isEditable
                      ? 'hover:bg-[#FF9B8E]'
                      : ''
                  }`}
                />
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* <div className="mt-6">
        <h2 className="font-bold mb-2">선택된 시간</h2>
        <ul className="text-sm list-disc list-inside">
          {selectedSlots.map((slot, i) => (
            <li key={i}>{`${slot.day} ${slot.time}`}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default TimeTable;
