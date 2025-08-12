// src/types/profile.ts
import type { CommonResponse } from './common';

export interface Profile {
  id: string;
  name: string;
  department: string;
  tags: string[];
  image: string;
}

// 프로필 상세 조회용 타입 추가함
export interface UserKeywordDto {
  id: number;
  type: string;
  title: string;
  description: string;
}

// API `/api/members/recommendations` 
export interface RecommendationProfile {
  memberId: number;
  memberName: string;
  profileImageUrl: string;
  studentNo: string;
  department: string;
  userInterests: string[];
  //Optional 로 변경
  userKeywords?: UserKeywordDto[];
}

//CommonResponse 로 통일 
export type ResponseRecommendationDto = CommonResponse<RecommendationProfile[]>;


// 인기 멤버 단일 프로필 
export interface PopularProfile {
  memberId: number;
  memberName: string;
  profileImageUrl: string;
  studentNo: string;
  department: string;
  userInterests: string[];
  // userKeywords가 필요없으면 빼셔도 됩니다.
}

// CommonResponse 로 통일 
export type ResponsePopularDto = CommonResponse<PopularProfile[]>;


export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN';

export interface TimeTableDto {
  dayOfWeek: DayOfWeek;
  startTime: string;
  endTime: string;
  subjectName: string;
}

export interface ProfileDetail {
  id: number;
  memberName: string;
  email: string;
  studentNo: string;
  university: string;
  college: string;
  department: string;
  profileImageUrl: string;
  userKeywords: UserKeywordDto[];
  userInterests: string[];
  timeTables: TimeTableDto[];
  createdAt: string;
  updatedAt: string;
  matchStatus: string;
}

export type ResponseProfileDetailDto = CommonResponse<ProfileDetail>;
