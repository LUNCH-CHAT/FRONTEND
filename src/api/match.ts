import type { ResponseMatchListDto } from '../types/match';
import { axiosInstance } from './axios';

// 매칭 목록 조회
export const getMatchingList = async ({
  status,
  page,
}: {
  status: string;
  page: number;
}): Promise<ResponseMatchListDto> => {
  const { data } = await axiosInstance.get(`/api/matches`, {
    params: { status, page },
  });

  return data;
};
