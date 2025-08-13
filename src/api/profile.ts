// src/api/profile.ts
import { axiosInstance } from './axios';
import type { ResponseProfileDetailDto } from '../types/profile';

export const getProfileDetail = (memberId: number) =>
  axiosInstance.get<ResponseProfileDetailDto>(`/api/members/${memberId}`);

// 추가: 프로필 이미지 URL 저장
type ResponseOk = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string; 
};

export const updateProfileImage = (profileImageUrl: string) =>
  axiosInstance.patch<ResponseOk>('/api/members/profile-image', { profileImageUrl });