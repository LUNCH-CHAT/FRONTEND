// src/types/filters.ts

/** userKeywords 항목 */
export interface MemberKeywordDto {
  id: number
  type: string
  title: string
  description: string
}

/** /api/members/filters 결과 단위 */
export interface MemberFilterDto {
  memberId: number
  memberName: string
  profileImageUrl: string
  studentNo: string
  department: string
  userInterests: string[]
  userKeywords: MemberKeywordDto[]
}

/** /api/members/filters 전체 응답 */
export interface ResponseMembersFiltersDto {
  isSuccess: boolean
  code: string
  message: string
  result: {
    data: MemberFilterDto[]
    meta: {
      currentPage: number
      pageSize: number
      totalItems: number
      totalPages: number
      hasNext: boolean
    }
  }
}

