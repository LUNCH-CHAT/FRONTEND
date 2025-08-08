// src/pages/Home-Page/monthly-mentor-page.tsx

import { useState } from 'react';
import { postMonthlyMentor } from '../../api/mentor';
import ChatIcon from '../../assets/icons/chat.svg?react';
import CalendarIcon from '../../assets/icons/calendar.svg?react';
import SpeciesIcon from '../../assets/icons/species.svg?react';

export default function MonthlyMentorPage() {
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        // TODO: 필요하면 리디렉션 or 초기화
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

  return (
    <div className="w-full min-h-screen bg-white font-pretendard">
      {/* 멘토 배너 */}
      <div className="w-full h-[257px] overflow-hidden rounded-b-lg">
        <img
          src="/images/mento.png"
          alt="이달의 멘토 배너"
          className="w-full h-full object-cover"
        />
      </div>

      <main className="pt-[56px] pb-24">
        {/* 프로필 정보 */}
        <section className="mt-[4px] px-4">
          <h2 className="text-[22px] font-semibold">박지후 선배님</h2>
          <p className="mt-1 text-[16px] text-gray-700">
            에어버스 항공정비 엔지니어
          </p>
          <p className="mt-1 text-[13px] text-gray-500">
            한국항공대학교 항공기계공학과 15학번 졸업
          </p>
        </section>

        {/* 구분선 */}
        <div className="w-full h-[7px] bg-gray-100 my-6" />

        {/* 멘토님 소개 */}
        <section className="mt-6 px-4">
          <div className="flex items-center gap-2 mb-2">
            <ChatIcon className="w-5 h-5 text-[#FF7963]" />
            <span className="text-[15px] font-semibold text-[#FF7C6A]">
              멘토님 소개
            </span>
          </div>
          <p className="text-[13px] text-gray-700">
            전공이 정말 내 길이 맞는지 고민이 많았어요. 현장에서 일해보니
            학교에서 배운 게 실무에 이렇게 쓰이는구나 느꼈죠.
          </p>
          <div className="mt-2 p-4 bg-[#FFF1F0] rounded-lg space-y-2 text-[12px] text-gray-700">
            <p>
              항공기 정비, 엔진 시스템 설계 등 실제 항공기 운항을 지원하는
              다양한 업무를 맡고 있어요. 항공 산업 길도, 글로벌 기업 취업 전략,
              자격증 준비 등 궁금한 분들 환영합니다.
            </p>
            <p>
              직무 이해가 막막하거나, 포트폴리오/면접 준비가 궁금하시다면,
              항공정비 엔지니어의 실무가 알고 싶은 분! 점심시간에 멘토님과
              함께 현실적인 조언과 진로 인사이트를 나눌 수 있는 진-챗치
              기회를 놓치지 마세요.
            </p>
          </div>
        </section>

        {/* 구분선 */}
        <div className="w-full h-[7px] bg-gray-100 my-6" />

        {/* 커피챗 일정 */}
        <section className="mt-6 px-4">
          <div className="flex items-center gap-2 mb-2">
            <CalendarIcon className="w-5 h-5 text-[#FF7963]" />
            <span className="text-[15px] font-semibold text-[#FF7C6A]">
              커피챗 일정
            </span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[13px] pl-4">
            <li>날짜: 9월 8일 (목)</li>
            <li>시간: 12:30 ~ 13:20</li>
            <li>장소: 공대 3호관 스터디룸</li>
            <li>모집 인원: 최대 5명</li>
          </ul>
        </section>

        {/* 구분선 */}
        <div className="w-full h-[7px] bg-gray-100 my-6" />

        {/* 신청 전 참고사항 */}
        <section className="mt-6 px-4">
          <div className="flex items-center gap-2 mb-2">
            <SpeciesIcon className="w-5 h-5 text-[#FF7963]" />
            <span className="text-[15px] font-semibold text-[#FF7C6A]">
              신청 전 참고사항
            </span>
          </div>
          <ul className="list-disc list-inside space-y-1 text-[13px] pl-4">
            <li>비슷한 관심사를 가진 학생을 우선 매칭합니다.</li>
            <li>신청 인원이 많을 경우 추첨을 통해 안내됩니다.</li>
            <li>
              확정된 참가자에게는 커피챗 날짜로부터 2일 전에 개별 안내 예정입니다.
            </li>
          </ul>
        </section>

        {/* 신청서 작성 */}
        <section className="mt-6 px-4 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <SpeciesIcon className="w-5 h-5 text-[#FF7963]" />
            <span className="text-[15px] font-semibold text-[#FF7C6A]">
              신청서 작성
            </span>
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1">
              연락 가능한 전화번호를 입력해주세요.
            </label>
            <input
              type="tel"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              placeholder="010-0000-0000"
              className="w-full h-10 px-3 border border-gray-300 rounded-lg text-[14px] placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-[13px] font-medium mb-1">
              멘토 선배님께 묻고 싶은 질문이 있다면 적어주세요.{' '}
              <span className="text-black">(선택)</span>
            </label>
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value)}
              placeholder="자유롭게 작성해 주세요. (최대 100자)"
              className="w-full h-24 p-3 border border-gray-300 rounded-lg text-[14px] placeholder-gray-300 resize-none"
            />
          </div>
        </section>
      </main>

      {/* 하단 신청하기 버튼 */}
      <div className="fixed bottom-0 left-0 w-full max-w-[480px] px-5 pb-4 pt-2 bg-white border-t border-gray-200">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full h-12 rounded-lg text-white font-medium ${
            isLoading ? 'bg-gray-300' : 'bg-[#FF7963]'
          }`}
        >
          {isLoading ? '신청 중…' : '신청하기'}
        </button>
      </div>
    </div>
  );
}
