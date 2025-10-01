import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

// RTK Query에서 발생하는 FetchBaseQueryError인지 확인하는 타입 가드
export const isFetchBaseQueryError = (
  error: unknown,
): error is FetchBaseQueryError => {
  return typeof error === 'object' && error !== null && 'status' in error
}

// 에러 객체에 서버에서 전달한 메시지(data.message)가 있는지 확인하는 타입 가드
export const hasMessage = (
  error: unknown,
): error is { data: { message: string } } => {
  // error가 객체인지 확인
  if (typeof error !== 'object' || error === null) return false

  // data.message 존재 여부 체크
  const maybeError = error as { data?: { message?: unknown } }
  return typeof maybeError.data?.message === 'string'
}
