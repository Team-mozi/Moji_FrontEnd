import Input from '@/components/Input'
import Button from '@/components/Button'
import { useRegister } from '@/hooks/useRegister'
import { useState } from 'react'

const RegisterForm = () => {
  const {
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
  } = useRegister()

  const [emailError, setEmailError] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')

  // 버튼 활성화 여부
  const isButtonDisabled =
    !email ||
    !password ||
    !!emailError ||
    !!passwordError ||
    !!passwordMatchError ||
    isLoading

  return (
    <form onSubmit={handleSignup} className='flex flex-col'>
      <div className='space-y-7'>
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
            errorMessage={emailError}
            showError={!!emailError}
            onErrorChange={setEmailError}
          />
          <Button
            label='인증번호 전송'
            type='button'
            size='m'
            baseButton
            disabled={!!emailError || !email}
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
          errorMessage={passwordError}
          showError={!!passwordError}
          onErrorChange={setPasswordError}
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

        {/* API 에러 메시지 (추후 토스트메시지로 개발 예정) */}
        {apiError && <p className='text-red-500 text-sm'>{apiError}</p>}
      </div>

      {/* 회원가입 버튼 */}
      <div className='pt-10'>
        <Button
          type='submit'
          baseButton
          label='회원가입 완료'
          loading={isLoading}
          disabled={isButtonDisabled}
        />
      </div>
    </form>
  )
}

export default RegisterForm
