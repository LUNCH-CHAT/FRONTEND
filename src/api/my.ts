import type { ResponseMyInfoDto } from "../types/user";
import { axiosInstance } from "./axios";

export const getMyInfo = async (): Promise <ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get('/api/members/mypage');
    return data;
}

export const getUniv = async (): Promise<string> => {
    const { data } = await axiosInstance.get('/auth/uniName');
    return data;
}