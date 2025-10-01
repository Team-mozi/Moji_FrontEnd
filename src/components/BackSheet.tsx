import type { ReactNode } from 'react'

type BackSheetProps = {
  children: ReactNode
  showHeader?: boolean
  title?: string
}

const BackSheet = ({
  children,
  showHeader = false,
  title = '',
}: BackSheetProps) => {
  return (
    <div className='bg-gradient-to-b from-[#FFEBC0] to-white w-full min-h-screen py-16 px-32'>
      <div className='bg-white rounded-xl shadow-lg w-full h-[calc(100vh-8rem)] flex flex-col p-8 relative'>
        {/* 로고+타이틀 */}
        {showHeader && (
          <div className='absolute top-8 left-8'>
            <h1 className='text-4xl font-extrabold text-orange_five hidden lg:block'>
              MOZI
            </h1>
            {title && (
              <h2 className='text-xl font-medium text-black pt-2'>{title}</h2>
            )}
          </div>
        )}

        {/* 컨텐츠 영역 */}
        <div className='flex flex-1 items-center justify-center w-full'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default BackSheet
