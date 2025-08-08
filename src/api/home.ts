// src/api/home.ts
import { axiosInstance } from './axios';
import type {
  ResponseRecommendationDto,
  ResponsePopularDto,
} from '../types/profile';

//“나와 ‘시간표 · 관심사’가 겹쳐요!” 추천 사용자 목록 조회 
export const getRecommendations = () =>
  axiosInstance.get<ResponseRecommendationDto>('/api/members/recommendations');

//“이런 사람 어때요?” 인기 멤버 목록 조회 
export const getPopularMembers = () =>
  axiosInstance.get<ResponsePopularDto>('/api/members/popular');
