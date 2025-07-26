import type { CommonResponse } from './common';

// 단과대 목록 조회 응답
export type ResponseCollegeListDto = CommonResponse<
  {
    id: number;
    name: string;
  }[]
>;

// 단과대에 속한 학과 목록 조회 응답
export type ResponseDepartmentListDto = CommonResponse<
  {
    id: number;
    name: string;
  }[]
>;
