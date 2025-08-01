// src/types/profile.ts

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
