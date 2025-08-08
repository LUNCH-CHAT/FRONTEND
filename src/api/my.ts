import type { CommonResponse } from "../types/common";
import type { MyKeywords, MyTags, MyTimeTables, ResponseMyDetailDto, ResponseMyInfoDto } from "../types/user";
import { axiosInstance } from "./axios";

export const getMyInfo = async (): Promise <ResponseMyInfoDto> => {
    const { data } = await axiosInstance.get('/api/members/mypage');
    return data;
}

export const getUniv = async (): Promise<string> => {
    const { data } = await axiosInstance.get('/auth/uniName');
    return data;
}

export const getMyDetail = async (): Promise <ResponseMyDetailDto> => {
    const { data } = await axiosInstance.get('/api/members/me');
    return data;
}

export const patchKeywords = async (body: MyKeywords): Promise <CommonResponse<string>> => {
    const { data } = await axiosInstance.patch('/api/members/keywords',
        body
    );
    return data;
}

export const patchTags = async (body: MyTags): Promise <CommonResponse<string>> => {
    const { data } = await axiosInstance.patch('/api/members/me/tags',
        body
    );
    return data;
}

export const patchTimeTables = async (body: MyTimeTables): Promise <CommonResponse<string>> => {
    const { data } = await axiosInstance.patch('/api/timetables',
        body
    );
    return data;
}