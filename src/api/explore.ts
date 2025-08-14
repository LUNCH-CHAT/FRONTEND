// src/api/explore.ts
import { axiosInstance } from './axios'
import type {
  ResponseCollegeListDto,
  ResponseDepartmentListDto,
} from '../types/college'
import type {
  ResponseMembersFiltersDto,
  MemberFilterDto,
} from '../types/filters'

export async function getColleges(): Promise<{ id: number; name: string }[]> {
  const res = await axiosInstance.get<ResponseCollegeListDto>('/api/colleges')
  return res.data.result ?? []
}

export async function getDepartments(collegeId: number): Promise<string[]> {
  const res = await axiosInstance.get<ResponseDepartmentListDto>(
    `/api/colleges/${collegeId}/departments`,
  )
  return res.data.result.map((d) => d.name)
}

export interface MemberFilterParams {
  size: number
  page: number
  sort: 'recommend' | 'recent'
  interest?: string
  college?: number
  department?: string
  studentNo?: string
}

 //멤버 필터 API 호출 후 배열 반환
export async function getFilteredMembers(
  params: MemberFilterParams,
): Promise<MemberFilterDto[]> {
  const res = await axiosInstance.get<ResponseMembersFiltersDto>(
    '/api/members/filters',
    { params },
  )
  const result = res.data.result
  if (Array.isArray(result)) {
    return result
  }
  if ((result as any).data && Array.isArray((result as any).data)) {
    return (result as any).data
  }
  return []
}