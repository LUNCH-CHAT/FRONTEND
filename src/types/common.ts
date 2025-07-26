export type CommonResponse<T> = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: T;
};

// 알람 응답
export type ResponseAlarmDto = CommonResponse<string>;
