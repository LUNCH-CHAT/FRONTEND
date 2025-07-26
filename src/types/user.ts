import type { CommonResponse } from './common';

export type UserKeyword = {
  id: number;
  keywordName: string;
};

export type UserInterest = {
  id: number;
  interestName: string;
};

export type TimeTable = {
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  subjectName: string;
};

export type UserDetail = {
  id: number;
  memberName: string;
  email: string;
  studentNo: string;
  university: string;
  college: string;
  department: string;
  profileImageUrl: string;
  userKeywords: UserKeyword[];
  userInterests: UserInterest[];
  timeTables: TimeTable[];
  createdAt: Date;
  updatedAt: Date;
};

export type UserProfile = {
  memberId: number;
  memberName: string;
  profileImageUrl: string;
  studentNo: string;
  department: string;
  userInterests: UserInterest[];
  userKeywords: UserKeyword[];
};

// 사용자 프로필 상세 조회 응답
export type ResponseUserProfileDetailDto = CommonResponse<UserDetail>;

// 시간표, 관심사 기반 프로필 추천 응답
export type ResponseRecommendProfile = CommonResponse<UserProfile[]>;

export type MyInfo = {
  profileImageUrl: string;
  name: string;
  studentId: string;
  department: string;
  completed: number;
  requested: number;
  received: number;
  keywords: string[];
  tags: string[];
};

// 마이페이지 조회 응답
export type ResponseMyInfoDto = CommonResponse<MyInfo>;
