import { useState } from 'react'
import { UserApi } from '@/services/endpoints/user'
import { useNavigate } from 'react-router-dom'
import { hasMessage } from '@/utils/errorGuards'

/**
 * 회원가입 로직을 관리하는 훅
 * - 입력값 상태 관리(email, password 등)
 * - 비밀번호 일치 검증
 * - API 요청 상태(isLoading) 관리
 * - 에러 메시지 상태 관리(apiError)
 */
export const useRegister = () => {
  // 입력값 상태
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // 비밀번호 불일치 오류 메시지
  const [passwordMatchError, setPasswordMatchError] = useState('')

  // API 요청 실패 시 표시할 에러 메시지
  const [apiError, setApiError] = useState('')

  // 회원가입 요청 중 상태
  const [isLoading, setIsLoading] = useState(false)

  // RTK Query의 register mutation
  const [register] = UserApi.useRegisterMutation()
  const navigate = useNavigate()

  /**
   * 비밀번호와 비밀번호 재확인이 일치하는지 검증
   * @param pwd 비밀번호
   * @param confirmPwd 비밀번호 재확인
   */
  const validatePasswords = (pwd: string, confirmPwd: string) => {
    if (pwd && confirmPwd && pwd !== confirmPwd) {
      setPasswordMatchError('비밀번호가 일치하지 않습니다.')
    } else {
      setPasswordMatchError('')
    }
  }

  /**
   * 비밀번호 입력값 변경 처리
   * @param value 비밀번호
   */
  const handlePasswordChange = (value: string) => {
    setPassword(value)
    validatePasswords(value, confirmPassword)
  }

  /**
   * 비밀번호 재확인 입력값 변경 처리
   * @param value 비밀번호 재확인
   */
  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    validatePasswords(password, value)
  }

  /**
   * 회원가입 폼 제출 처리
   * - 비밀번호 일치 여부 확인
   * - API 요청 수행
   * - 요청 중 로딩 상태 관리
   * - 요청 실패 시 에러 메시지 상태 업데이트
   * - 요청 성공 시 로그인 페이지로 이동
   */
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 비밀번호가 일치하지 않으면 요청 차단
    if (password !== confirmPassword) return

    try {
      setApiError('') // 이전 에러 초기화
      setIsLoading(true) // 요청 시작
      await register({
        registerRequest: { email, password, agreed: true },
      }).unwrap()
      navigate('/login') // 성공 시 로그인 페이지로 이동
    } catch (err: unknown) {
      const userMessage = hasMessage(err)
        ? err.data.message
        : '회원가입에 실패했습니다.'
      setApiError(userMessage)
      console.error('회원가입 실패:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    email,
    setEmail,
    password,
    confirmPassword,
    passwordMatchError,
    apiError,
    isLoading,
    handlePasswordChange,
    handleConfirmPasswordChange,
    handleSignup,
  }
}
