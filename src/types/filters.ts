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
  isSuccess: boolean;
  code: string;
  message: string;
  // 서버가 내려주는 result가 바로 MemberFilterDto[] 배열이기 때문에
  // meta 없이 배열로만 정의합니다.
  result: MemberFilterDto[];
}

