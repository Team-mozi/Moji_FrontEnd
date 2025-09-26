import Input from '@/components/Input'
import Button from '@/components/Button'
import { useLogin } from '@/hooks/useLogin'

const LoginForm = () => {
  const { setEmail, setPassword, error, isLoading, handleLogin } = useLogin()

  return (
    <form onSubmit={handleLogin} className='flex flex-col space-y-4'>
      <div className='space-y-6'>
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
      <div className='pt-2'>
        <Button
          label={isLoading ? '로그인 중...' : '로그인'}
          type='submit'
          baseButton
        />
      </div>
    </form>
  )
}

export default LoginForm
