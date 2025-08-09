// src/types/mentor.ts
export interface MonthlyMentorRequest {
  phone: string;
  question?: string;
}

export interface CommonResponse<T = string> {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
}
