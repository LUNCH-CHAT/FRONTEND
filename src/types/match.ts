import type { CommonResponse } from './common';
import type { UserProfile } from './user';

export type MatchedUser = Omit<UserProfile, 'memberId'> & {
  id: number;
};

export type MatchList = {
  id: number;
  createdAt: Date;
  matchedUser: MatchedUser;
};

// 매칭 목록 조회 응답
export type ResponseMatchListDto = CommonResponse<MatchList[]>;

// 매칭 요청 응답
export type ResponseMatchRequestDto = CommonResponse<{
  id: number;
  status: string;
  createdAt: Date;
}>;

// 매칭 수락 응답
export type ResponseMatchAcceptDto = CommonResponse<unknown>;
