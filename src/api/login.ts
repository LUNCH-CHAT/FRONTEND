import axios from "axios";
import type { ResponseSigninDto, SignupInfo } from "../types/auth";
import type { ResponseCollegeListDto, ResponseDepartmentListDto } from "../types/college";
import { axiosInstance } from "./axios";
import type { CommonResponse } from "../types/common";
import { logoutTimer, refreshTimer } from "./refresh";

export const getLogin = async (code: string) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/login/google`,{
        params: {code},
        withCredentials: true, // 쿠키 저장 
    });
    console.log(response);
    const accessToken = response.headers["access"];
    localStorage.setItem('accessToken', accessToken);
    await refreshTimer();

    const payloadBase64 = accessToken.split('.')[1];
    const payload = JSON.parse(atob(payloadBase64));
    console.log('exp', payload.exp);
    const expDate = new Date(payload.exp * 1000);
    console.log('만료일시(KST):', expDate.toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
    console.log('현재일시(KST):', new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' }));
    console.log('남은 시간(초):', payload.exp - Math.floor(Date.now() / 1000));
    return response;
};

export const patchSignUp = async (body: SignupInfo): Promise <ResponseSigninDto> => {
    const { data } = await axiosInstance.patch('/auth/signUp/lunchChat',
        body
    );
    return data;
}

export const getColleges = async (): Promise <ResponseCollegeListDto> => {
    const { data } = await axiosInstance.get('/api/colleges');
    return data;
}

export const getDepartments = async (collegeId: number): Promise <ResponseDepartmentListDto> => {
    const { data } = await axiosInstance.get(`/api/colleges/${collegeId}/departments`);
    return data;
}

export const postLogout = async (): Promise <CommonResponse<string>> => {
    const { data } = await axiosInstance.post(`/auth/logout`,
        {},
        { withCredentials: true, }
    );
    localStorage.removeItem('accessToken');
    logoutTimer();
    return data;
}