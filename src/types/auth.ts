import type { CommonResponse } from './common';
import type { TimeTable } from './user';

export type ResponseSigninDto = CommonResponse<string>;

export interface SignupInfo {
    membername: string;
    studentNo: string;
    collegeId: number;
    departmentId: number;
    interests: string[];
    timeTables: TimeTable[];
}
