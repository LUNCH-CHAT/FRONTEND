// src/api/mentor.ts
import { axiosInstance } from './axios';
import type { MonthlyMentorRequest, CommonResponse } from '../types/mentor';

export const postMonthlyMentor = async (
  body: MonthlyMentorRequest,
): Promise<CommonResponse> => {
  const { data } = await axiosInstance.post('/api/mentor/monthlyM', body);
  return data;
};
