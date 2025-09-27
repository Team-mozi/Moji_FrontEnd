import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import SideSheet, { type SideSheetProps } from '../../components/SideSheet'

const meta: Meta<typeof SideSheet> = {
  argTypes: {
    disableOverlayClose: { control: 'boolean' },
    isOpen: { control: 'boolean' },
    showCloseChevron: { control: 'boolean' },
    userName: { control: 'text' },
  },
  component: SideSheet,
  parameters: {
    layout: 'fullscreen',
  },
  title: 'Components/SideSheet',
}
export default meta

/**
 * 기본 사이드시트 스토리
 */
function TemplateWithState(args: Partial<SideSheetProps>) {
  const [open, setOpen] = useState(true)
  return (
    <div className='h-screen bg-gray-100'>
      <div className='p-8'>
        <h1 className='text-2xl font-bold mb-4'>SideSheet 컴포넌트 테스트</h1>
        <button
          className='px-4 py-2 bg-orange-400 text-white rounded-lg hover:bg-orange-500 transition-colors'
          onClick={() => setOpen(true)}
        >
          사이드시트 열기
        </button>
      </div>
      <SideSheet
        isOpen={open}
        onClose={() => setOpen(false)}
        userName='가영'
        {...args}
      />
    </div>
  )
}

/**
 * 기본 사이드시트 (게시글 + 채팅)
 */
export const Default: StoryObj<typeof SideSheet> = {
  render: (args) => <TemplateWithState {...args} />,
}
