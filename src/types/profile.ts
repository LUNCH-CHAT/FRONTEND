// src/types/profile.ts
import type { CommonResponse } from './common';
export interface Profile {
  id: string;
  name: string;
  department: string;
  tags: string[];
  image: string;
}

// API `/api/members/recommendations` 한 건
export interface RecommendationProfile {
  memberId: number;
  memberName: string;
  profileImageUrl: string;

  studentNo: string;              
  department: string;            
  userInterests: string[];        
  userKeywords: {                 // 추가 키워드 (필요 없으면 무시 가능)
    id: number;
    type: string;
    title: string;
    description: string;
  }[];
}

// API `/api/members/recommendations` 전체 응답
export interface ResponseRecommendationDto {
  isSuccess: boolean;
  code: string;
  message: string;
  result: RecommendationProfile[];
}


/** 인기 멤버 단일 프로필 */
export interface PopularProfile {
  memberId: number;
  memberName: string;
  profileImageUrl: string;
  studentNo: string;
  department: string;
  userInterests: string[];
  // userKeywords가 필요없으면 빼셔도 됩니다.
}

/** 인기 멤버 전체 응답 */
export interface ResponsePopularDto {
  isSuccess: boolean;
  code: string;
  message: string;
  result: PopularProfile[];
}

// 프로필 상세 조회용 타입 추가함
export interface UserKeywordDto {
  id: number;
  type: string;
  title: string;
  description: string;
}

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

