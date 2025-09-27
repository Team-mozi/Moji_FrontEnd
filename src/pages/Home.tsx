import { useState } from 'react'

import SideSheet from '../components/SideSheet'

const Home = () => {
  const [open, setOpen] = useState(false)
  const userName = '혜수'

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

      {/* 사이드시트 */}
      <SideSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        userName={userName}
      />
    </div>
  )
}

export default Home
