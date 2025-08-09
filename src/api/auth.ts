// src/api/auth.ts
import { axiosInstance } from './axios';

// uniName 조회 (텍스트 plain 반환)
export const getUniName = () =>
  axiosInstance.get<string>('/auth/uniName');
