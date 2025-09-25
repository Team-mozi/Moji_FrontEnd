import React, { useState } from 'react'
import Input from '@/components/Input'
import Button from '@/components/Button'
import { UserApi } from '@/services/endpoints/user'
import { useNavigate } from 'react-router-dom'

const RegisterForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [passwordMatchError, setPasswordMatchError] = useState('')

  const [register] = UserApi.useRegisterMutation()
  const navigate = useNavigate()

  // 🔹 공통: 비밀번호 일치 여부 검증
  const validatePasswords = (pwd: string, confirmPwd: string) => {
    if (pwd && confirmPwd && pwd !== confirmPwd) {
      setPasswordMatchError('비밀번호가 일치하지 않습니다.')
    } else {
      setPasswordMatchError('')
    }
  }

  // 비밀번호 입력 시
  const handlePasswordChange = (value: string) => {
    setPassword(value)
    validatePasswords(value, confirmPassword)
  }

  // 비밀번호 재확인 입력 시
  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value)
    validatePasswords(password, value)
  }

  // 회원가입 요청
  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // 불일치 시 API 요청 차단
    if (password !== confirmPassword) return

    try {
      await register({
        registerRequest: { email, password, agreed: true },
      }).unwrap()
      console.log('회원가입 성공!')
      navigate('/login')
    } catch (err) {
      console.error('회원가입 실패:', err)
    }
  }

  return (
    <form onSubmit={handleSignup} className='flex flex-col space-y-4'>
      <div className='space-y-6'>
        {/* 이메일 입력 + 인증 버튼 */}
        <div className='flex items-end space-x-2 w-full'>
          <Input
            label='이메일'
            name='email'
            type='email'
            placeholder='이메일'
            required
            onChange={(value) => setEmail(value)}
            containerClassName='flex-1'
          />
          <Button
            label='인증번호 전송'
            type='button'
            size='m'
            baseButton
            className='flex-none'
          />
        </div>

        {/* 이메일 인증번호 입력 + 확인 버튼 */}
        <div className='flex items-end space-x-2 w-full'>
          <Input
            label='이메일 인증 번호'
            name='emailConfirm'
            type='text'
            placeholder='이메일 인증 번호'
            containerClassName='flex-1'
          />
          <Button
            label='인증 확인'
            type='button'
            size='m'
            baseButton
            className='flex-none'
          />
        </div>

        {/* 비밀번호 */}
        <Input
          label='비밀번호'
          name='password'
          type='password'
          placeholder='비밀번호'
          required
          onChange={handlePasswordChange}
        />

        {/* 비밀번호 재확인 */}
        <Input
          label='비밀번호 재확인'
          name='confirmPassword'
          type='password'
          placeholder='비밀번호 재확인'
          required
          isConfirmPassword
          onChange={handleConfirmPasswordChange}
          errorMessage={passwordMatchError}
          showError={!!passwordMatchError}
        />
      </div>

      <div className='pt-2'>
        <Button label='회원가입 완료' type='submit' baseButton />
      </div>
    </form>
  )
}

export default RegisterForm
