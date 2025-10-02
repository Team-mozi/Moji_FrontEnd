import { useState } from 'react'
import SideSheet from '@/components/SideSheet'
import Button from '@/components/Button'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import LogoutModal from '@/features/modal/LogoutModal'
import WithdrawalModal from '@/features/modal/WithdrawalModal'

const MyPage = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false)
  const { nickname, email } = useSelector((state: RootState) => state.auth)

  return (
    <div>
      {/* 추후 홈에서 마이페이지 버튼 추가하면 삭제 예정 */}
      <Button
        label='마이페이지'
        onClick={() => setIsOpen(true)}
        baseButton
        size='s'
      />

      <SideSheet isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* 마이페이지 컨텐츠 영역 */}
        <SideSheet.Content>
          <div className='p-12 space-y-4'>
            <p className='text-5xl font-extrabold text-orange_five'>MOZI</p>
            <p className='text-xl'>{nickname} 님</p>
            <p className='text-xl'>{email}</p>
          </div>
        </SideSheet.Content>

        {/* 마이페이지 푸터 버튼 영역 */}
        <SideSheet.Footer>
          <div className='p-12 space-y-6'>
            <Button
              label='로그아웃'
              baseButton
              onClick={() => setIsLogoutModalOpen(true)}
            />
            <Button
              label='회원탈퇴'
              onClick={() => setIsWithdrawalModalOpen(true)}
            />
          </div>
        </SideSheet.Footer>
      </SideSheet>

      {/* 로그아웃 모달 */}
      <LogoutModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
      />

      {/* 회원탈퇴 모달 */}
      <WithdrawalModal
        isOpen={isWithdrawalModalOpen}
        onClose={() => setIsWithdrawalModalOpen(false)}
      />
    </div>
  )
}

export default MyPage
