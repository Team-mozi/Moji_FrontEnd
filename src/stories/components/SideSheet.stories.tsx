import type { Meta, StoryObj } from '@storybook/react'

import { useState } from 'react'

import SideSheet, { type SideSheetProps } from '../../components/SideSheet'
import PostSideSheetComponent from '../../features/sideSheet/main-side-sheet'

const meta: Meta<typeof SideSheet> = {
  argTypes: {
    disableOverlayClose: { control: 'boolean' },
    isOpen: { control: 'boolean' },
    showCloseButton: { control: 'boolean' },
  },
  component: SideSheet,
  parameters: {
    docs: {
      description: {
        component: `
# SideSheet 컴포넌트 가이드

## 1. 기본 SideSheet (재사용 가능한 컴포넌트)
- Header, Content, Footer 슬롯을 제공하는 복합 컴포넌트
- 다양한 용도로 재사용 가능
- 외부 닫기 버튼 포함

## 2. PostSideSheet (게시글 + 채팅 전용)
- 게시글 내용과 채팅 기능이 포함된 완성된 사이드시트
- 실제 홈에서 사용하는 버전
- 채팅창 확대/축소 기능 포함

## 사용법
\`\`\`tsx
// 기본 SideSheet
<SideSheet isOpen={isOpen} onClose={onClose}>
  <SideSheet.Header>헤더 내용</SideSheet.Header>
  <SideSheet.Content>메인 콘텐츠</SideSheet.Content>
  <SideSheet.Footer>푸터 내용</SideSheet.Footer>
</SideSheet>

// PostSideSheet (게시글 + 채팅)
<PostSideSheet 
  isOpen={isOpen} 
  onClose={onClose} 
  userName="사용자명" 
/>
\`\`\`
        `,
      },
    },
    layout: 'fullscreen',
  },
  title: 'Components/SideSheet',
}
export default meta

/**
 * 기본 SideSheet 사용 예제
 */
function BasicSideSheetTemplate(args: Partial<SideSheetProps>) {
  const [open, setOpen] = useState(false)

  return (
    <div className='h-screen bg-gray-100'>
      <div className='p-8'>
        <h1 className='text-2xl font-bold mb-4'>기본 SideSheet 컴포넌트</h1>
        <p className='text-gray-600 mb-6'>
          재사용 가능한 기본 SideSheet 컴포넌트입니다. Header, Content, Footer
          슬롯을 제공합니다.
        </p>
        <button
          className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors'
          onClick={() => setOpen(true)}
        >
          기본 사이드시트 열기
        </button>
      </div>

      <SideSheet isOpen={open} onClose={() => setOpen(false)} {...args}>
        <SideSheet.Header>
          <div className='p-4 border-b'>
            <h2 className='text-xl font-bold'>사이드시트 제목</h2>
            <p className='text-sm text-gray-500'>부제목이나 설명</p>
          </div>
        </SideSheet.Header>

        <SideSheet.Content>
          <div className='p-4'>
            <h3 className='font-semibold mb-2'>Header 영역</h3>
            <p className='text-sm text-gray-600 mb-4'>
              제목과 부제목이 들어가는 영역
            </p>

            <h3 className='font-semibold mb-2'>Content 영역</h3>
            <p className='text-sm text-gray-600 mb-4'>
              메인 콘텐츠가 들어가는 영역
            </p>

            <div className='space-y-2'>
              <div className='p-2 bg-gray-50 rounded text-sm'>
                • 스크롤 가능한 콘텐츠
              </div>
              <div className='p-2 bg-gray-50 rounded text-sm'>
                • 다양한 컴포넌트 배치 가능
              </div>
            </div>
          </div>
        </SideSheet.Content>

        <SideSheet.Footer>
          <div className='p-4 border-t'>
            <h3 className='font-semibold mb-2'>Footer 영역</h3>
            <p className='text-sm text-gray-600'>
              액션 버튼이나 추가 정보가 들어가는 영역
            </p>
          </div>
        </SideSheet.Footer>
      </SideSheet>
    </div>
  )
}

/**
 * PostSideSheet 사용 예제 (게시글 + 채팅)
 */
function PostSideSheetTemplate() {
  const [open, setOpen] = useState(false)

  return (
    <div className='h-screen bg-gray-100'>
      <div className='p-8'>
        <h1 className='text-2xl font-bold mb-4'>
          PostSideSheet (게시글 + 채팅)
        </h1>
        <p className='text-gray-600 mb-6'>
          실제 홈에서 사용하는 게시글 + 채팅 기능이 포함된 완성된
          사이드시트입니다.
        </p>
        <button
          className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors'
          onClick={() => setOpen(true)}
        >
          게시글 사이드시트 열기
        </button>
      </div>

      <PostSideSheetComponent
        isOpen={open}
        onClose={() => setOpen(false)}
        userName='혜수'
        postTime={1}
      />
    </div>
  )
}

/**
 * 기본 SideSheet 스토리
 */
export const BasicSideSheet: StoryObj<typeof SideSheet> = {
  parameters: {
    docs: {
      description: {
        story: `
# 기본 SideSheet 컴포넌트

재사용 가능한 기본 SideSheet 컴포넌트입니다.

## 특징
- **Header, Content, Footer** 슬롯 제공
- **복합 컴포넌트 패턴** 사용
- **외부 닫기 버튼** 포함
- **다양한 용도**로 재사용 가능

## 사용법
\`\`\`tsx
<SideSheet isOpen={isOpen} onClose={onClose}>
  <SideSheet.Header>
    <h2>제목</h2>
  </SideSheet.Header>
  
  <SideSheet.Content>
    <p>메인 콘텐츠</p>
  </SideSheet.Content>
  
  <SideSheet.Footer>
    <button>액션</button>
  </SideSheet.Footer>
</SideSheet>
\`\`\`
        `,
      },
    },
  },
  render: (args) => <BasicSideSheetTemplate {...args} />,
}

/**
 * PostSideSheet 스토리 (게시글 + 채팅)
 */
export const PostSideSheet: StoryObj<typeof SideSheet> = {
  parameters: {
    docs: {
      description: {
        story: `
# PostSideSheet (게시글 + 채팅)

실제 홈에서 사용하는 게시글 + 채팅 기능이 포함된 완성된 사이드시트입니다.

## 특징
- **게시글 내용** 표시
- **실시간 채팅** 기능
- **채팅창 확대/축소** 토글
- **외부 닫기 버튼** (사이드시트 왼쪽)
- **댓글 입력** 기능

## 사용법
\`\`\`tsx
<PostSideSheet 
  isOpen={isOpen} 
  onClose={onClose} 
  userName="사용자명"
  postTime={1}
/>
\`\`\`

## 컴포넌트 구조
- **PostSideSheet**: 완성된 사이드시트 컴포넌트
- **SideSheetHeader**: 사용자명, 시간, 신고 버튼
- **PostContent**: 게시글 내용
- **ChatArea**: 채팅 메시지 목록
- **ChatInput**: 댓글 입력 폼
- **ToggleButton**: 채팅창 확대/축소
        `,
      },
    },
  },
  render: () => <PostSideSheetTemplate />,
}
