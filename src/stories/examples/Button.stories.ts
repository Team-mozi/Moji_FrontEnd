import type { Meta, StoryObj } from '@storybook/react'
import { fn } from 'storybook/test'
import { Button } from './Button'

// 스토리북 기본 설정
// - title: 컴포넌트 카테고리/이름
// - parameters.layout: Canvas 중앙 정렬
// - tags: autodocs 활성화 (자동 문서화)
const meta = {
  // 파일 경로와 같게 설정
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    // size: 버튼 크기 선택
    size: {
      control: { type: 'radio' },
      options: ['small', 'medium', 'large'],
      description: '버튼 크기 선택',
    },
    // className: Tailwind 추가 클래스 입력
    className: { control: 'text', description: '추가 Tailwind 클래스' },
    // label: 버튼 라벨 텍스트
    label: { control: 'text', description: '버튼 내부 텍스트' },
    // disabled: 비활성화 여부
    disabled: { control: 'boolean', description: '버튼 비활성화 여부' },
  },
  // onClick를 액션 패널에서 확인할 수 있게 기본 제공
  args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// 사용 가이드: 기본 버튼 (주황 배경, 검은 텍스트)
export const Default: Story = {
  args: {
    label: '기본 버튼',
  },
}

// 사용 가이드: 큰 사이즈
export const Large: Story = {
  args: {
    size: 'large',
    label: '큰 버튼',
  },
}

// 사용 가이드: 작은 사이즈
export const Small: Story = {
  args: {
    size: 'small',
    label: '작은 버튼',
  },
}
