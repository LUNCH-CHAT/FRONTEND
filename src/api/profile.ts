// src/api/profile.ts
import { axiosInstance } from './axios';
import type { ResponseProfileDetailDto } from '../types/profile';

export const getProfileDetail = (memberId: number) =>
  axiosInstance.get<ResponseProfileDetailDto>(`/api/members/${memberId}`);
