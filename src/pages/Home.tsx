import { useEffect, useState } from 'react'

import PostSideSheet from '@/features/sideSheet/main-side-sheet'
import { useSelector } from 'react-redux'
import type { RootState } from '@/store/store'
import NicknameForm from '@/features/modal/NickNameModal'
import Modal from '@/components/Modal'
import MyPage from '@/features/mypage'

const Home = () => {
  const [open, setOpen] = useState(false)
  const userName = '혜수'
  const { nickname, isLoggedIn } = useSelector((state: RootState) => state.auth)
  const [isOpen, setModalOpen] = useState(false)

  // 로그인 상태 + 닉네임 null => 닉네임 모달 열기
  useEffect(() => {
    if (isLoggedIn && !nickname) {
      setModalOpen(true)
    }
  }, [isLoggedIn, nickname])

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Home</h1>

      <button
        type='button'
        className='mb-4 px-4 py-2 rounded bg-black text-white'
        onClick={() => setOpen((v) => !v)}
      >
        {open ? '사이드시트 닫기' : '사이드시트 열기'}
      </button>

      {/* 게시글 + 채팅 사이드시트 */}
      <PostSideSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        userName={userName}
      />

      {/* 닉네임 설정 모달 */}
      <Modal isOpen={isOpen} size='md'>
        <NicknameForm onClose={() => setModalOpen(false)} />
      </Modal>

      {/* 마이페이지 사이드시트 */}
      <MyPage />
    </div>
  )
}

export default Home
