import React, { useEffect, useState } from 'react'

import ChatArea from '../features/sideSheet/chat-area'
import ChatInput from '../features/sideSheet/chat-input'
import PostContent from '../features/sideSheet/post-content'
import SideSheetCloseButton from '../features/sideSheet/side-sheet-close-button'
import SideSheetHeader from '../features/sideSheet/side-sheet-header'
import ToggleButton from './ToggleButton'

/**
 * 사이드시트 컴포넌트의 Props 타입 정의
 */
export type SideSheetProps = {
  /** 사이드시트 열림/닫힘 상태 */
  isOpen: boolean
  /** 사이드시트 닫기 콜백 함수 */
  onClose: () => void
  /** 사용자명 (임시 기본값: '혜수') */
  userName?: string
  /** 사이드시트 컨테이너 추가 CSS 클래스 */
  className?: string
  /** 오버레이 추가 CSS 클래스(추후 미사용 시 제거 예정) */
  overlayClassName?: string
  /** 오버레이 클릭으로 닫기 비활성화 여부 */
  disableOverlayClose?: boolean
  /** 닫기 버튼 표시 여부 (기본값: true) */
  showCloseChevron?: boolean
}

/**
 * 사이드시트 컴포넌트
 * 오른쪽에서 슬라이드되어 나타나는 모달 형태의 패널
 * 게시글 내용과 채팅 기능을 제공
 */
const SideSheet: React.FC<SideSheetProps> = ({
  className,
  disableOverlayClose,
  isOpen,
  onClose,
  overlayClassName,
  showCloseChevron = true,
}) => {
  /** 채팅 메시지 목록 */
  const [chatMessages, setChatMessages] = useState<string[]>([])
  /** 입력 필드의 현재 값 */
  const [inputValue, setInputValue] = useState('')
  /** 채팅창 확대/축소 상태 (기본값: 축소 - 게시글 보임) */
  const [isChatExpanded, setIsChatExpanded] = useState(false)

  // 임시 데이터 (추후 API 연동 시 제거)
  const userName = '혜수' // 추후 session에서 추출
  const postTime = 1 // 게시글 작성 시간

  // 이벤트 핸들러
  /**
   * 채팅 메시지 전송 처리
   * 입력값이 있을 때만 메시지 목록에 추가하고 입력 필드 초기화
   */
  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setChatMessages((prev) => [...prev, inputValue])
      setInputValue('')
    }
  }

  // 사이드 이펙트
  /**
   * 사이드시트 열림/닫힘에 따른 body 스크롤 제어
   * 열릴 때: body 스크롤 비활성화 (배경 스크롤 방지)
   * 닫힐 때: 원래 스크롤 상태로 복원
   */
  useEffect(() => {
    if (isOpen) {
      const original = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = original
      }
    }
  }, [isOpen])

  /**
   * ESC 키로 사이드시트 닫기, 외부 영역 클릭 시 닫힘 기능
   * 사이드시트가 열려있을 때만 이벤트 리스너 등록
   */
  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, onClose])

  return (
    <>
      {/* 배경 오버레이 */}
      <div
        className={[
          'fixed inset-0 z-40 bg-black/40 transition-opacity duration-300',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
          overlayClassName || '',
        ].join(' ')}
        onClick={() => {
          if (!disableOverlayClose) onClose()
        }}
      />

      {/* 사이드시트 메인 컨테이너 */}
      <aside
        role='dialog'
        aria-modal='true'
        className={[
          'fixed top-0 right-0 z-50 h-screen w-[50vw] max-w-[720px] min-w-[320px] bg-white',
          'transform transition-transform duration-300 will-change-transform',
          isOpen ? 'translate-x-0' : 'translate-x-full',
          'flex flex-col rounded-l-2xl border-l border-gray_one',
          className || '',
        ].join(' ')}
      >
        <div className='flex h-full'>
          {/* 외부 닫기 버튼 */}
          <SideSheetCloseButton
            isOpen={isOpen}
            onClose={onClose}
            showCloseChevron={showCloseChevron}
          />

          {/* 사이드시트 콘텐츠 영역 */}
          <div className='flex-1 flex flex-col min-w-0 rounded-sm'>
            {/* 헤더: 사용자명, 시간, 신고 버튼 */}
            <SideSheetHeader
              userName={userName}
              postTime={postTime}
              onClose={onClose}
            />

            {/* 메인 콘텐츠 영역 */}
            <div className='flex-1 overflow-hidden flex flex-col px-8'>
              {/* 게시글 내용 (채팅창이 확대되지 않았을 때만 표시) */}
              {!isChatExpanded && <PostContent />}

              {/* 채팅 영역 */}
              <div className='mt-4 flex-1 min-h-0 overflow-y-auto pr-1'>
                {/* 채팅창 확대/축소 토글 버튼 */}
                <ToggleButton
                  isExpanded={isChatExpanded}
                  onToggle={() => setIsChatExpanded(!isChatExpanded)}
                  expandedText='채팅창 축소하기'
                  collapsedText='채팅창 확대하기'
                />
                {/* 채팅 메시지 목록 */}
                <ChatArea messages={chatMessages} />
              </div>
            </div>

            {/* 채팅 입력 영역 */}
            <div className='px-5 py-4 min-h-[100px]'>
              <ChatInput
                inputValue={inputValue}
                onInputChange={setInputValue}
                onSendMessage={handleSendMessage}
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}

export default SideSheet
