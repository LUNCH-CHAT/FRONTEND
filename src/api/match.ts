import type {
  ResponseMatchAcceptDto,
  ResponseMatchListDto,
  ResponseMatchRequestDto,
} from '../types/match';
import { axiosInstance } from './axios';

// 매칭 목록 조회
export const getMatchingList = async ({
  status,
  page,
  size,
}: {
  status: string;
  page?: number;
  size?: number;
}): Promise<ResponseMatchListDto> => {
  const { data } = await axiosInstance.get(`/api/matches`, {
    params: { status, page, size },
  });

  return data;
};

// 매칭 요청 생성
export const requestMatch = async (toMemberId: number): Promise<ResponseMatchRequestDto> => {
  const { data } = await axiosInstance.post('/api/matches', { toMemberId });
  return data;
};

// 매칭 수락
export const acceptMatch = async (otherMemberId: number): Promise<ResponseMatchAcceptDto> => {
  const { data } = await axiosInstance.patch(`/api/matches/accept/${otherMemberId}`, {
    params: { otherMemberId },
  });

  return data;
};
