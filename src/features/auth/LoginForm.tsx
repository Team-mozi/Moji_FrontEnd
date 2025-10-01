import Input from '@/components/Input'
import Button from '@/components/Button'
import { useLogin } from '@/hooks/useLogin'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const { setEmail, setPassword, error, isLoading, handleLogin } = useLogin()
  const navigate = useNavigate()

  const handlePasswordReset = () => {
    navigate('/password-reset')
  }

  return (
    <form onSubmit={handleLogin} className='flex flex-col w-full space-y-4'>
      <div className='space-y-7'>
        <Input
          label='이메일'
          name='email'
          type='email'
          placeholder='이메일'
          required
          onChange={(value) => setEmail(value)}
        />
        <Input
          label='비밀번호'
          name='password'
          type='password'
          placeholder='비밀번호'
          required
          onChange={(value) => setPassword(value)}
        />
        {error && <p className='text-red-500 text-sm'>{error}</p>}
      </div>

      <button
        type='button'
        onClick={handlePasswordReset}
        className='text-base text-orange_five hover:underline self-end mt-1 p-2'
      >
        비밀번호 찾기
      </button>

      <Button type='submit' baseButton label='로그인' loading={isLoading} />
    </form>
  )
}

export default LoginForm
