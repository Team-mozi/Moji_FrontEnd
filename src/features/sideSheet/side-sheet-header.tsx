import React from 'react'

type SideSheetHeaderProps = {
  userName: string
  postTime: number
  onClose: () => void
}

const SideSheetHeader: React.FC<SideSheetHeaderProps> = ({
  userName,
  postTime,
  onClose,
}) => {
  return (
    <div className='flex items-center justify-between px-8 py-6'>
      <div className='min-w-0 flex-1'>
        <div className='text-lg font-bold flex items-center gap-2'>
          {userName}님의 게시글
          <span className='text-gray_one text-medium text-xs pt-2'>
            {postTime}시간 전
          </span>
        </div>
      </div>
      <button
        type='button'
        aria-label='Close'
        title='신고하기'
        onClick={onClose}
        className='text-red-500 font-semibold hover:bg-gray-100 active:bg-gray-200'
      >
        신고
      </button>
    </div>
  )
}

export default SideSheetHeader
