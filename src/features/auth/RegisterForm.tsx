import Input from '@/components/Input'
import Button from '@/components/Button'
import { useRegister } from '@/hooks/useRegister'

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

        {/* API 에러 메시지 (추후 토스트메시지로 개발 예정) */}
        {apiError && <p className='text-red-500 text-sm'>{apiError}</p>}
      </div>

      {/* 회원가입 버튼 */}
      <div className='pt-10'>
        <Button
          type='submit'
          baseButton
          label={
            isLoading ? (
              <div className='flex items-center justify-center space-x-2'>
                <div className='w-5 h-5 border-2 border-t-white border-r-white border-b-transparent border-l-transparent rounded-full animate-spin'></div>
              </div>
            ) : (
              '회원가입 완료'
            )
          }
        />
      </div>
    </form>
  )
}

export default RegisterForm
