import axios from "axios";
import type { ResponseSigninDto, SignupInfo } from "../types/auth";
import type { ResponseCollegeListDto, ResponseDepartmentListDto } from "../types/college";
import { axiosInstance } from "./axios";

export const getLogin = async (code: string) => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/login/google`,{
        params: {code},
        withCredentials: true, // 쿠키 저장 
    });
    console.log(response);
    const accessToken = response.headers["access"];
    localStorage.setItem('accessToken', accessToken);
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