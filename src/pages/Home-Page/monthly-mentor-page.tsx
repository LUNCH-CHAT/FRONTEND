// src/pages/Home-Page/monthly-mentor-page.tsx
import { useState } from 'react';
import { postMonthlyMentor } from '../../api/mentor';
import ChatIcon from '../../assets/icons/chat.svg?react';
import CalendarIcon from '../../assets/icons/calendar.svg?react';
import SpeciesIcon from '../../assets/icons/species.svg?react';
//학교별 멘토 설정 훅
import { useMentorConfig } from '../../hooks/useMentorConfig';

export default function MonthlyMentorPage() {
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // ✅ 입력 포커스 중인지 여부(키보드 열림 감지용)
  const [isFormFocused, setIsFormFocused] = useState(false);

  //학교별 멘토 설정 불러오기
  const { conf, loading } = useMentorConfig();
  if (loading) return null;

  const handleSubmit = async () => {
    if (!phone) {
      alert('전화번호를 입력해주세요.');
      return;
    }
    setIsLoading(true);
    try {
      const res = await postMonthlyMentor({ phone, question });
      if (res.isSuccess) {
        alert('신청이 완료되었습니다!');
      } else {
        alert(`실패: ${res.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('서버 요청 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const firstIntro = conf.introParagraphs[0] ?? '';
  const restIntro = conf.introParagraphs.slice(1);

  return (
    <div className="w-full min-h-[100dvh] bg-white font-pretendard max-w-[480px] mx-auto">
      {/* 멘토 배너 (학교별) */}
      <div className="w-full flex justify-center rounded-b-lg">
        <img
          src={conf.bannerSrc}
          alt="이달의 멘토 배너"
          className="
            block
            h-auto
            max-w-full
            object-contain
            max-[480px]:w-[375px]
          "
        />
      </div>

      {/* ✅ 포커스 아닐 땐 하단 버튼 높이+safe-area만큼 여백, 포커스 중엔 줄임 */}
      <main className={`pt-[22px] md:pt-0 ${isFormFocused ? 'pb-6' : 'pb-[calc(env(safe-area-inset-bottom)+8rem)]'}`}>
        {/* 프로필 정보 (학교별) */}
        <section className="mt-[4px] px-4">
          <h2 className="text-[22px] font-semibold">{conf.mentorName}</h2>
          <p className="mt-1 text-[16px] text-gray-700">{conf.mentorTitle}</p>
          <p className="mt-1 text-[13px] text-gray-500">{conf.mentorSub}</p>
        </section>

        {/* 구분선 */}
        <div className="w-full h-[7px] bg-gray-100 my-6" />

        {/* 멘토님 소개 (학교별) */}
        <section className="mt-6 px-4">
          <div className="flex items-center gap-2 mb-2">
            <ChatIcon className="w-5 h-5 text-[#F56156]" />
            <span className="text-[15px] font-semibold text-[#F56156]">멘토님 소개</span>
          </div>

          {firstIntro && <p className="text-[13px] text-gray-700">{firstIntro}</p>}

          {restIntro.length > 0 && (
            <div className="mt-2 p-4 bg-[#FFF1F0] rounded-lg space-y-2 text-[12px] text-gray-700">
              {restIntro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
        </section>

        {/* 구분선 */}
        <div className="w-full h-[7px] bg-gray-100 my-6" />

        {/* 커피챗 일정 (학교별) */}
        <section className="mt-6 px-4">
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon className="w-5 h-5 text-[#F56156]" />
            <span className="text-[15px] font-semibold text-[#F56156]">커피챗 일정</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[13px] pl-4">
            <li>날짜: {conf.schedule.date}</li>
            <li>시간: {conf.schedule.time}</li>
            <li>장소: {conf.schedule.place}</li>
            <li>모집 인원: {conf.schedule.capacity}</li>
          </ul>
        </section>

        {/* 구분선 */}
        <div className="w-full h-[7px] bg-gray-100 my-6" />

        {/* 신청 전 참고사항 (고정) */}
        <section className="mt-6 px-4">
          <div className="flex items-center gap-2 mb-2">
            <SpeciesIcon className="w-5 h-5 text-[#F56156]" />
            <span className="text-[15px] font-semibold text-[#F56156]">신청 전 참고사항</span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[13px] pl-4">
            <li>비슷한 관심사를 가진 학생을 우선 매칭합니다.</li>
            <li>신청 인원이 많을 경우 추첨을 통해 안내됩니다.</li>
            <li>확정된 참가자에게는 커피챗 날짜로부터 2일 전에 개별 안내 예정입니다.</li>
          </ul>
        </section>

        {/* 신청서 작성 */}
        <section className="mt-6 px-4 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <SpeciesIcon className="w-5 h-5 text-[#F56156]" />
            <span className="text-[15px] font-semibold text-[#F56156]">신청서 작성</span>
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1">연락 가능한 전화번호를 입력해주세요.</label>
            <input
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              onFocus={() => setIsFormFocused(true)}
              onBlur={() => setIsFormFocused(false)}
              placeholder="010-0000-0000"
              className="
                w-full h-10 px-3 rounded-lg text-base placeholder-gray-300
                border border-gray-300
                focus:outline-none focus:ring-0 focus:border-gray-300
              "
            />
          </div>

          <div>
            <label className="block text-[13px] font-medium mb-1">
              멘토 선배님께 묻고 싶은 질문이 있다면 적어주세요. <span className="text-black">(선택)</span>
            </label>
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onFocus={() => setIsFormFocused(true)}
              onBlur={() => setIsFormFocused(false)}
              placeholder="자유롭게 작성해 주세요. (최대 100자)"
              className="
                w-full h-24 p-3 rounded-lg text-base placeholder-gray-300 resize-none
                border border-gray-300
                focus:outline-none focus:ring-0 focus:border-gray-300
              "
              maxLength={100}
            />
          </div>
        </section>
      </main>

      {/* 하단 신청하기 버튼 */}
      <div
        className={`
          fixed bottom-0 left-1/2 -translate-x-1/2
          w-full max-w-[480px] px-5 pt-2
          bg-white border-t border-gray-200
          pb-[calc(env(safe-area-inset-bottom)+1rem)]
          ${isFormFocused ? 'hidden md:block' : ''}
        `}
      >
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full h-12 rounded-lg text-white font-medium ${
            isLoading ? 'bg-gray-300' : 'bg-[#F56156] hover:bg-[#e04c4c] transition-colors'
          }`}
        >
          {isLoading ? '신청 중…' : '신청하기'}
        </button>
      </div>
    </div>
  );
}
