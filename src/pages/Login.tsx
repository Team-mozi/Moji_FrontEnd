import LoginForm from '@/features/auth/LoginForm'
import Button from '@/components/Button'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from '@/store/store'
import { logout } from '@/store/slices/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { isLoggedIn, email } = useSelector((state: RootState) => state.auth)
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  // 로그아웃 (추후 삭제 예정)
  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-white'>
      <div className='w-full max-w-xl p-8 sm:p-10 space-y-6'>
        <div className='flex flex-row items-center space-x-2'>
          <h2 className='text-2xl font-bold text-black'>로그인</h2>
        </div>

        {isLoggedIn ? (
          <>
            <p className='mb-4'>{email}님, 이미 로그인 되어 있습니다.</p>
            {/* 로그아웃 추후 삭제 예정  */}
            <Button
              label='로그아웃'
              type='button'
              baseButton
              onClick={handleLogout}
            />
          </>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  )
}

export default Login
