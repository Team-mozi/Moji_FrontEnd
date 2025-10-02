import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWithdrawMutation } from '@/services/endpoints/user'
import { useDispatch } from 'react-redux'
import { logout } from '@/store/slices/authSlice'
import Button from '@/components/Button'
import Modal from '@/components/Modal'
import Input from '@/components/Input'

interface WithdrawalModalProps {
  isOpen: boolean
  onClose: () => void
}

const WithdrawalModal = ({ isOpen, onClose }: WithdrawalModalProps) => {
  const [password, setPassword] = useState('')
  const [withdraw, { isLoading }] = useWithdrawMutation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [error, setError] = useState<string | null>(null)

  const handleWithdrawal = async () => {
    try {
      setError(null)
      await withdraw({ userWithdrawalRequest: { password } }).unwrap()
      dispatch(logout())
      onClose()
      alert('회원탈퇴가 완료되었습니다.') // 추후 토스트 메시지로 개발할 예정
      navigate('/login')
    } catch (err: any) {
      console.error('회원탈퇴 실패:', err)
      setError(err?.data?.message || '비밀번호를 다시 입력해주세요.')
    }
  }

  return (
    <Modal isOpen={isOpen} size='md'>
      <div className='px-4 flex flex-col items-center text-center'>
        <h2 className='text-xl font-semibold mb-4'>회원탈퇴</h2>
        <p className='text-lg mb-4'>
          정말 탈퇴하시겠습니까? <br />
          계정은 삭제되며 복구되지 않습니다.
        </p>
        <div className='w-full'>
          <Input
            label=''
            name='password'
            type='password'
            placeholder='비밀번호를 입력하세요'
            onChange={(e) => setPassword(e)}
          ></Input>
        </div>
        {/* 토스트메시지로 개발할 예정 */}
        {error && <p className='text-red_one text-sm'>{error}</p>}

        <div className='flex justify-center gap-6 mt-8 w-full'>
          <Button
            label='탈퇴하기'
            baseButton
            onClick={handleWithdrawal}
            loading={isLoading}
            disabled={!password || isLoading}
          />
          <Button label='취소' onClick={onClose} />
        </div>
      </div>
    </Modal>
  )
}

export default WithdrawalModal
