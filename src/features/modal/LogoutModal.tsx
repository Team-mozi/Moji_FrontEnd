import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '@/components/Button'
import { useLogoutMutation } from '@/services/endpoints/user'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/slices/authSlice'
import Modal from '@/components/Modal'

interface LogoutModalProps {
  isOpen: boolean
  onClose: () => void
}

const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const [logoutApi, { isLoading }] = useLogoutMutation()
  const dispatch = useDispatch()
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      setError(null)
      await logoutApi().unwrap()
      dispatch(logout())
      onClose()
      alert('로그아웃되었습니다.') // 추후 토스트 메시지로 개발할 예정
      navigate('/login') // 로그아웃 후 로그인 페이지로 이동
    } catch (e) {
      console.error('로그아웃 실패', e)
      setError('로그아웃 중 오류가 발생했습니다.')
    }
  }

  return (
    <Modal isOpen={isOpen} size='md'>
      <div className='px-4 flex flex-col items-center text-center'>
        <h2 className='text-xl font-semibold mb-4'>로그아웃</h2>
        <p className='text-lg text-gray-600 mb-6'>로그아웃 하시겠습니까?</p>

        {/* 토스트메시지로 개발할 예정 */}
        {error && <p className='text-red_one text-sm'>{error}</p>}

        <div className='flex justify-center gap-6 mt-4 w-full'>
          <Button
            label='확인'
            baseButton
            onClick={handleLogout}
            loading={isLoading}
          />
          <Button label='취소' onClick={onClose} />
        </div>
      </div>
    </Modal>
  )
}

export default LogoutModal
