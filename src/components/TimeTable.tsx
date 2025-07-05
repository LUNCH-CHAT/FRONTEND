import React, { useRef, useState } from 'react';

type Day = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI';

interface TimeSlot {
  day: Day;
  time: string;
}

// interface TimeTableProps {
//   onChange?: (slots: TimeSlot[]) => void;
// }

const days: Day[] = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

const times = [
  '9:30 ~ 10:00',
  '11:00 ~ 12:15',
  '12:30 ~ 13:45',
  '14:00 ~ 15:15',
  '15:30 ~ 16:45',
  '17:00 ~ 18:15',
  '18:30 ~ 19:45',
];

const TimeTable = () => {
  const [selectedSlots, setselectedSlots] = useState<TimeSlot[]>([]);
  // 포인터가 눌린 상태인지 추적 (드래그 선택에 사용)
  const isPointerDownRef = useRef(false);
  // 이미 선택된 셀의 key (중복 선택 방지용)
  const touchedSlotsRef = useRef<Set<string>>(new Set());

  // selectedSlots가 변경될 때마다 상위 컴포넌트로 값을 전달
  // useEffect(() => {
  //   onChange?.(selectedSlots);
  // }, [selectedSlots, onChange]);

  // 시간 슬롯 토글 함수 (선택/해제)
  const toggleSlot = (day: Day, time: string) => {
    const exists = selectedSlots.some(slot => slot.day === day && slot.time === time);

    // 슬롯이 배열에 이미 존재하면 필터링 제거, 없으면 추가
    if (exists) {
      setselectedSlots(prev => prev.filter(cell => !(cell.day === day && cell.time === time)));
    } else {
      setselectedSlots(prev => [...prev, { day, time }]);
    }
  };

  // 화면 좌표에서 어떤 셀을 선택했는지 가져오는 함수
  const getCellFromPoint = (x: number, y: number): { day: Day; time: string } | null => {
    const element = document.elementFromPoint(x, y) as HTMLElement | null;

    if (element?.dataset.day && element?.dataset.time) {
      return { day: element.dataset.day as Day, time: element.dataset.time };
    }
    return null;
  };

  // 포인터가 눌릴 때
  const handlePointerDown = (e: React.PointerEvent) => {
    isPointerDownRef.current = true;
    touchedSlotsRef.current.clear(); // 이전 선택 셀 초기화

    const cell = getCellFromPoint(e.clientX, e.clientY); // 현재 좌표를 전달

    if (cell) {
      const key = `${cell.day}-${cell.time}`;
      touchedSlotsRef.current.add(key); // 선택된 셀 추가
      toggleSlot(cell.day, cell.time); // 조건 없이 무조건 실행
    }
  };

  // 포인터가 움직일 때 (드래그 중)
  const handlePointerMove = (e: React.PointerEvent) => {
    // 포인터가 눌려있지 않은 상태면 리턴
    if (!isPointerDownRef.current) return;

    const cell = getCellFromPoint(e.clientX, e.clientY);

    if (cell) {
      const key = `${cell.day}-${cell.time}`;
      // 현재 위치한 셀이 이미 선택된 셀이 아닌 경우에만 새로 추가
      if (!touchedSlotsRef.current.has(key)) {
        touchedSlotsRef.current.add(key);
        toggleSlot(cell.day, cell.time); // 처음 방문한 셀에만 toggleSlot 실행
      }
    }
  };

  // 포인터가 떼어질 때
  const handlePointerUp = () => {
    isPointerDownRef.current = false;
    touchedSlotsRef.current.clear(); // 선택 추적 셀 초기화
  };

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      className="select-none touch-none" // 텍스트 선택 방지, 터치 스크롤 방지
    >
      {/* 타임 테이블 그리드 */}
      <div
        role="table"
        className="grid gap-0.5"
        style={{ gridTemplateColumns: '70px repeat(5,1fr)' }}
      >
        {/* 요일 */}
        <div role="columnheader" className="border border-[#969696] p-2 rounded-tl-md"></div>
        {days.map(day => (
          <div
            role="columnheader"
            key={day}
            className={`border border-[#969696] min-w-[3.5rem] p-2 font-[pretendard] font-medium text-sm text-center ${
              day === 'FRI' ? 'rounded-tr-md' : ''
            }`}
          >
            {day}
          </div>
        ))}

        {/* 시간표 */}
        {times.map((time, index) => (
          // <React.Fragment>는 렌더링 결과에 DOM 요소를 생성하지 않음
          // 아래 div 요소들을 grid의 자식으로 적용 가능하도록
          <React.Fragment key={time}>
            <div
              role="rowheader"
              className={`border border-[#969696] p-2 text-sm font-[pretendard] text-[#969696] ${
                index === times.length - 1 ? 'rounded-bl-md' : ''
              }`}
            >
              {time}
            </div>
            {days.map(day => {
              const isSelected = selectedSlots.some(slot => slot.day === day && slot.time === time);
              return (
                <div
                  role="cell"
                  key={`${day}-${time}`}
                  data-day={day}
                  data-time={time}
                  className={`border border-[#969696] cursor-pointer ${
                    isSelected ? 'bg-[#FF7C6A]' : 'hover:bg-[#FF9B8E]'
                  }`}
                ></div>
              );
            })}
          </React.Fragment>
        ))}
      </div>

      {/* <div className="mt-6">
        <h2 className="font-bold mb-2">선택된 시간</h2>
        <ul className="text-sm list-disc list-inside">
          {selectedSlots.map((slot, idx) => (
            <li key={idx}>{`${slot.day} ${slot.time}`}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default TimeTable;
