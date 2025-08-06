import type { ResponseMatchListDto, ResponseMatchRequestDto } from '../types/match';
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
