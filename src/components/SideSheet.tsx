import React, { createContext, useEffect } from 'react'

type SideSheetContextType = {
  isOpen: boolean
  onClose: () => void
  className?: string
  overlayClassName?: string
  disableOverlayClose?: boolean
}

const SideSheetContext = createContext<SideSheetContextType | null>(null)

export type SideSheetProps = {
  /** 사이드시트 열림/닫힘 상태 */
  isOpen: boolean
  /** 사이드시트 닫기 콜백 함수 */
  onClose: () => void
  /** 사이드시트 컨테이너 추가 CSS 클래스 */
  className?: string
  overlayClassName?: string
  disableOverlayClose?: boolean
  /** 닫기 버튼 표시 여부 (기본값: true) */
  showCloseButton?: boolean
  children: React.ReactNode
}

/**
 * 기본 사이드시트 컴포넌트 (9/29 재사용 고려 컴포넌트 재구성 완료)
 * - 오버레이 렌더링 및 우측 슬라이드 인 컨테이너 기능
 * - 닫기 버튼 포함
 * - Header, Content, Footer 슬롯 제공
 */
const SideSheet: React.FC<SideSheetProps> & {
  Header: typeof SideSheetHeader
  Content: typeof SideSheetContent
  Footer: typeof SideSheetFooter
} = ({
  children,
  className,
  disableOverlayClose,
  isOpen,
  onClose,
  overlayClassName,
  showCloseButton = true,
}) => {
  const contextValue: SideSheetContextType = {
    className,
    disableOverlayClose,
    isOpen,
    onClose,
    overlayClassName,
  }

  // 사이드 이펙트
  /**
   * 사이드시트 열림/닫힘에 따른 body 스크롤 제어
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
   * ESC 키로 사이드시트 닫기
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
    <SideSheetContext.Provider value={contextValue}>
      {/* 배경 오버레이 */}
      <div
        className={[
          'fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ease-out',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
          overlayClassName || '',
        ].join(' ')}
        onClick={() => {
          if (!disableOverlayClose) onClose()
        }}
      />

      {/* 사이드시트와 닫기 버튼을 포함하는 단일 래퍼 */}
      <div
        className={[
          'fixed top-0 right-0 z-50 h-screen',
          'transform transition-transform duration-300 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        ].join(' ')}
      >
        {/* 외부 닫기 버튼 애니메이션 동기화를 위해 컴포넌트 분리하지 않음*/}
        {showCloseButton && isOpen && (
          <div className='absolute top-1/2 -left-12 -translate-y-1/2'>
            <button
              type='button'
              title='사이드시트 닫기'
              aria-label='사이드시트 닫기'
              onClick={onClose}
              className='h-20 w-12 rounded-l-xl bg-white border-l border-gray_one flex items-center justify-center hover:bg-gray-50 transition-colors'
            >
              <svg
                className='w-6 h-6 pl-1'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
          </div>
        )}

        {/* 사이드시트 메인 컨테이너 */}
        <aside
          role='dialog'
          aria-modal='true'
          className={[
            'h-screen w-[50vw] max-w-[720px] min-w-[320px] bg-white',
            'flex flex-col rounded-l-2xl border-l border-gray_one',
            className || '',
          ].join(' ')}
        >
          <div className='flex h-full relative'>
            {/* 콘텐츠 래퍼 */}
            <div className='flex-1 flex flex-col min-w-0 rounded-sm'>
              {children}
            </div>
          </div>
        </aside>
      </div>
    </SideSheetContext.Provider>
  )
}

/**
 * 사이드시트 헤더 컴포넌트
 */
const SideSheetHeader: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className='flex-shrink-0'>{children}</div>
}

/**
 * 사이드시트 콘텐츠 컴포넌트
 */
const SideSheetContent: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className='flex-1 overflow-hidden flex flex-col px-8'>{children}</div>
  )
}

/**
 * 사이드시트 푸터 컴포넌트
 */
const SideSheetFooter: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <div className='flex-shrink-0 px-5 py-4'>{children}</div>
}

// 복합 컴포넌트 패턴 설정
SideSheet.Header = SideSheetHeader
SideSheet.Content = SideSheetContent
SideSheet.Footer = SideSheetFooter

// 타입을 명시적으로 지정
const SideSheetWithSubComponents = SideSheet as typeof SideSheet & {
  Header: typeof SideSheetHeader
  Content: typeof SideSheetContent
  Footer: typeof SideSheetFooter
}

export default SideSheetWithSubComponents
