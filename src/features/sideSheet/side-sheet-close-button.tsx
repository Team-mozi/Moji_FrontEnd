import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type SideSheetCloseButtonProps = {
  isOpen: boolean
  onClose: () => void
  showCloseChevron?: boolean
}

/**
 * 사이드시트 외부에 위치한 닫기 버튼 컴포넌트
 * 사이드시트 왼쪽 경계에 붙어있는 형태로 배치
 */
const SideSheetCloseButton: React.FC<SideSheetCloseButtonProps> = ({
  isOpen,
  onClose,
  showCloseChevron = true,
}) => {
  // 닫기 버튼이 표시되지 않거나 사이드시트가 닫혀있으면 렌더링하지 않음
  if (!isOpen || !showCloseChevron) {
    return null
  }

  return (
    <div className='flex-none w-8 h-12 flex items-center justify-center absolute -left-6 top-1/2 -translate-y-1/2'>
      <button
        type='button'
        title='사이드시트 닫기'
        aria-label='사이드시트 닫기'
        onClick={onClose}
        className='h-20 w-12 rounded-l-xl bg-white border-l border-gray_one flex items-center justify-center hover:bg-gray-50 transition-colors'
      >
        <FontAwesomeIcon
          icon={faChevronLeft}
          className='text-base w-6 h-6 pl-1'
        />
      </button>
    </div>
  )
}

export default SideSheetCloseButton
