import axios from "axios";
import type { CommonResponse } from "../types/common";
import type { MyKeywords, MyTags, MyTimeTables, presignedUrlDto, ResponseKeywordDto, ResponseMyDetailDto, ResponseMyInfoDto } from "../types/user";
import { axiosInstance } from "./axios";
import type { UserKeywordDto } from "../types/profile";

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

export const postKeywordAI = async (description: string): Promise <ResponseKeywordDto> => {
    const { data } = await axiosInstance.post('/api/members/keywordAI',
        {description}
    );
    return data;
}

export const postPresignedUrl = async (fileName: string): Promise <presignedUrlDto> => {
    const { data } = await axiosInstance.post('/api/aws/presigned-url',
        {fileName}
    );
    return data;
}

export const putImage = async (presignedUrl: string, file: File) => {
    await axios.put(presignedUrl, file,{
        headers: {
            "Content-Type": file.type
        }
    });
}

export const getKeywords = async(): Promise <CommonResponse<UserKeywordDto[]>> => {
    const {data} = await axiosInstance.get('/api/members/keywords');
    return data;
}