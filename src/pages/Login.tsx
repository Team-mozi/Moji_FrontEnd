import LoginForm from '@/features/auth/LoginForm'
import Button from '@/components/Button'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import { useNavigate } from 'react-router-dom'
import BackSheet from '@/components/BackSheet'
import { useEffect } from 'react'

const Login = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.auth)
  const navigate = useNavigate()

  // 로그인 상태면 로그인 페이지 접근 차단
  useEffect(() => {
    if (isLoggedIn) {
      navigate('/') // 홈으로 이동
    }
  }, [isLoggedIn, navigate])

  return (
    <BackSheet>
      <div className='flex w-full h-full justify-center'>
        {/* 왼쪽 영역 */}
        <div className='w-full flex flex-col justify-center p-12 rounded-l-xl'>
          <h1 className='text-4xl font-extrabold text-orange_five'>MOZI</h1>
          <p className='text-lg font-medium mt-4'>
            당신의 하루, 하나의 이모지로 전하세요 😊
          </p>
          <p className='text-md pt-24'>
            아직 가입하지 않으셨나요? <br />
            가입하고 오늘의 기분을 남겨보세요
          </p>
          <Button
            label='회원가입'
            type='button'
            onClick={() => navigate('/register')}
            className='mt-6'
          />
        </div>

        <div className='absolute top-20 bottom-20 left-1/2 w-px bg-gray-300'></div>
        {/* 오른쪽 로그인 영역 */}
        <div className='w-full flex flex-col justify-center items-center p-12'>
          <LoginForm />
        </div>
      </div>
    </BackSheet>
  )
}

export default Login
