import type { CommonResponse } from './common';
import type { TimeTableDto } from './profile';

export type ResponseSigninDto = CommonResponse<string>;

export interface SignupInfo {
    membername: string;
    studentNo: string;
    collegeId: number;
    departmentId: number;
    interests: string[];
    timeTables: TimeTableDto[];
}
