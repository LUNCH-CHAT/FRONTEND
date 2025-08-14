export type SchoolKey = '한국항공대' | '이화여대' | '가톨릭대' | 'UMC';

export interface MentorConfig {
  bannerSrc: string;
  mentorName: string;
  mentorTitle: string;
  mentorSub: string;
  introParagraphs: string[];
  schedule: { date: string; time: string; place: string; capacity: string };
}

export const SCHOOL_CONFIG: Record<SchoolKey, MentorConfig> = {
  가톨릭대: {
    bannerSrc: '/images/mentor-profile.png',
    mentorName: '김지윤 선배님',
    mentorTitle: '네이버 커머스 CIC 프론트엔드 개발자',
    mentorSub: '컴퓨터공학과 16학번 졸업',
    introParagraphs: [
      '비전공자도 개발자가 될 수 있을까요? 포기하고 싶을 때마다 저도 그 질문을 되뇌었습니다. 함께 이야기 나눠요!',
      '가톨릭대 컴퓨터공학과를 졸업한 뒤, 스타트업과 대기업을 두루 거쳐 현재는 네이버에서 프론트엔드 개발을 담당하고 있어요. 실무 사용자 경험을 개선하기 위한 UI 개발을 꾸준히 하고 있고, React, TypeScript, Next.js, GraphQL 등 다양한 최신 기술을 활용해 실제 프로덕트를 운영하고 있습니다.',
      '직무 이해가 막막하거나, 포트폴리오/면접 준비가 궁금하시다면, 네이버 개발자의 실무가 궁금한 분! 점심시간에 현실적인 조언과 진로 인사이트를 나눌 수 있는 기회를 놓치지 마세요.',
    ],
    schedule: {
      date: '9월 8일 (목)',
      time: '12:30 ~ 13:20',
      place: '중앙도서관 5층 스터디룸',
      capacity: '최대 5명',
    },
  },

  이화여대: {
    bannerSrc: '/images/mentor-profile.png',
    mentorName: '김소연 선배님',
    mentorTitle: '카카오서비스 UX 디자이너',
    mentorSub: '시각디자인학과 16학번 졸업',
    introParagraphs: [
      '처음부터 UX 디자이너를 꿈꿨던 건 아니었어요. 막막했던 진로 고민은 선배들과의 대화를 통해 풀어 나갔고, 그 경험이 지금의 저를 만들었습니다.',
      '카카오서비스에서 UX 기획 및 사용자 리서치를 담당하며, 실무 중심의 경험을 쌓고 있어요. UX 전환을 고민하는 분들, 포트폴리오 구성이나 현업 프로세스가 궁금한 분들이 편하게 질문하고 이야기 나눌 수 있도록 모두 환영합니다.',
      '직무 이해가 막막하거나, 포트폴리오/면접 준비가 궁금하신가요? 점심시간에 멘토링으로 현실적인 조언과 진로 인사이트를 함께 나눠요.',
    ],
    schedule: {
      date: '9월 8일 (목)',
      time: '12:30 ~ 13:20',
      place: '중앙도서관 5층 스터디룸',
      capacity: '최대 5명',
    },
  },

  한국항공대: {
    bannerSrc: '/images/mentor-profile.png',
    mentorName: '박지후 선배님',
    mentorTitle: '에어버스 항공정비 엔지니어',
    mentorSub: '항공기계공학과 15학번 졸업',
    introParagraphs: [
      '전공이 정말 내 길이 맞는지 고민이 많았어요. 현장에서 일해보니 학교에서 배운 게 실무에 이렇게 쓰이는구나 느꼈죠.',
      '항공기 정비, 엔진 시스템 설계 등 실제 항공기 운항을 지원하는 다양한 업무를 맡고 있어요. 항공 산업 커리어, 글로벌 기업 취업 전략, 자격증 준비 등 궁금한 분들 환영합니다.',
      '직무 이해가 막막하거나, 포트폴리오/면접 준비가 궁금하시다면, 항공정비 엔지니어의 실무가 궁금한 분! 점심시간에 현실적인 조언과 진로 인사이트를 나눌 수 있는 기회를 놓치지 마세요.',
    ],
    schedule: {
      date: '9월 8일 (목)',
      time: '12:30 ~ 13:20',
      place: '공대 3호관 스터디룸',
      capacity: '최대 5명',
    },
  },

  UMC: {
    bannerSrc: '/images/mentor-profile.png',
    mentorName: 'UMC 멘토',
    mentorTitle: 'UMC 엔지니어',
    mentorSub: '소프트웨어학과 13학번 졸업',
    introParagraphs: [
      '대학 시절부터 다양한 개발 프로젝트와 해커톤에 참여하며 실무 감각을 키워온 멘토입니다. 현재는 UMC에서 활동하며 웹·앱 서비스 개발, 기획, 협업 경험을 쌓고 있습니다.',
      '프론트엔드와 백엔드 모두 경험이 있어, 웹 개발 전반에 걸친 학습 로드맵, 실무에서 쓰이는 기술 스택, 포트폴리오 준비 방법 등을 알려드립니다.',
      '개발 동아리 활동을 처음 시작하는 분, 프로젝트 경험을 쌓고 싶은 분, 또는 IT 업계 진로에 대해 궁금한 점이 있는 분 모두 환영합니다.'
    ],
    schedule: {
      date: '9월 8일 (목)',
      time: '12:30 ~ 13:20',
      place: '공대 3호관 스터디룸',
      capacity: '최대 3명',
    },
  },
};

export function resolveSchoolKey(uniName?: string): SchoolKey {
  if (!uniName) return 'UMC';
  const s = uniName.replace(/\s/g, '').toLowerCase();

  if (s.includes('umc')) return 'UMC';          
  if (s.includes('한국항공') || s.includes('항공대')) return '한국항공대';
  if (s.includes('이화여자') || s.includes('이화여대')) return '이화여대';
  if (s.includes('가톨릭')) return '가톨릭대';
  return 'UMC';
}

