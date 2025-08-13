import type { CommonResponse } from './common';
import type { TimeTableDto, UserKeywordDto } from './profile';

export type UserKeyword = {
  id: number;
  keywordName: string;
};

export type UserInterest = {
  id: number;
  interestName: string;
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
  timeTables: TimeTableDto[];
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

export type MyDetail = {
  memberName: string;
  studentNo: string;
  department: string;
  profileImageUrl: string;
  userKeywords: UserKeywordDto[];
  userInterests: string[];
  timeTables: TimeTableDto[];
};

export type AIkeyword = {
  keyword: string;
}

// 마이페이지 조회 응답
export type ResponseMyInfoDto = CommonResponse<MyInfo>;

// 내 프로필 상세 조회 응답
export type ResponseMyDetailDto = CommonResponse<MyDetail>;

//키워드 편집하기 
export type MyKeyword = {
  type: "EXPRESS" | "GOAL" | "INTEREST" ;
  title: string;
  description: string;
}

export type MyKeywords = {
  "keywords": MyKeyword[];
}

export type MyTags = {
  "interestIds": number[];
}

export type MyTimeTables = {
  "timeTableList": TimeTableDto[];
}

export type ResponseKeywordDto = CommonResponse<AIkeyword>;
