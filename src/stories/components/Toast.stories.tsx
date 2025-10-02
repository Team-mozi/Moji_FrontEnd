import type { Meta, StoryObj } from '@storybook/react'
import ToastProvider from '@/components/ToastProvider'
import { useToast } from '@/hooks/useToast'
import Button from '@/components/Button' // 기존에 만들어진 Button 컴포넌트 활용

const meta: Meta = {
  title: 'Components/ToastMessage',
  component: Button,
  decorators: [
    Story => (
      <ToastProvider>
        <div className="font-sans p-5">
          <h2 className="text-xl font-bold mb-2">Toast Message UI</h2>
          <p className="text-gray-600 mb-6">
            아래 버튼을 클릭하여 다양한 토스트 메시지를 테스트해보세요.
          </p>
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * Toast를 트리거하는 버튼들을 렌더링하는 템플릿 컴포넌트
 */
const ToastTrigger = ({
  scenarios,
}: {
  scenarios: { label: string; props: Parameters<ReturnType<typeof useToast>['showToast']>[0] }[]
}) => {
  const { showToast } = useToast()

  return (
    <div className="flex flex-wrap gap-3">
      {scenarios.map(({ label, props }) => (
        <Button key={label} label={label} onClick={() => showToast(props)} />
      ))}
    </div>
  )
}

// ==============================================================================
// 스 토 리
// ==============================================================================

/**
 * 기본값으로 설정된 Toast Message 테스트
 */
export const Default: Story = {
  render: () => (
    <ToastTrigger
      scenarios={[
        {
          label: '기본 토스트 띄우기 (Success)',
          props: { message: '성공적으로 처리되었습니다.' },
        },
      ]}
    />
  ),
}

/**
 * 유형 타입의 ToastMessage 테스트
 */
export const ByType: Story = {
  name: '메시지 유형별',
  render: () => (
    <ToastTrigger
      scenarios={[
        {
          label: 'Success',
          props: { message: '요청에 성공했습니다.', messageType: 'success' },
        },
        {
          label: 'Fail',
          props: { message: '일부 정보가 누락되었습니다.', messageType: 'fail' },
        },
        {
          label: 'Error',
          props: { message: '서버에 오류가 발생했습니다.', messageType: 'error' },
        },
      ]}
    />
  ),
}

/**
 * 특정 사이즈의 ToastMessage 테스트
 */
export const BySize: Story = {
  name: '크기별',
  render: () => (
    <ToastTrigger
      scenarios={[
        {
          label: 'Small',
          props: { message: '이모지가 추가되었습니다.', size: 's' },
        },
        {
          label: 'Medium (기본값)',
          props: { message: '이모지가 추가되었습니다.', size: 'm' },
        },
        {
          label: 'Large',
          props: { message: '이모지가 추가되었습니다.', size: 'l' },
        },
      ]}
    />
  ),
}

/**
 * 특정 위치의 ToastMessage 테스트
 */
export const ByPosition: Story = {
  name: '위치별',
  render: () => (
    <ToastTrigger
      scenarios={[
        {
          label: '중앙 상단 (기본값)',
          props: { message: '중앙 상단에 표시됩니다.', position: 'top-center' },
        },
        {
          label: '중앙 하단',
          props: { message: '중앙 하단에 표시됩니다.', position: 'bottom-center' },
        },
        {
          label: '좌측 하단',
          props: { message: '좌측 하단에 표시됩니다.', position: 'bottom-left' },
        },
        {
          label: '우측 하단',
          props: { message: '우측 하단에 표시됩니다.', position: 'bottom-right' },
        },
      ]}
    />
  ),
}

/**
 * 지속 시간 ToastMessage 테스트
 */
export const CustomDuration: Story = {
  name: '지속 시간 조절',
  render: () => (
    <ToastTrigger
      scenarios={[
        {
          label: '1초만에 사라짐',
          props: { message: '1초 뒤에 사라집니다.', duration: 1000 },
        },
        {
          label: '5초간 보임',
          props: {
            message: '이 메시지는 5초 동안 표시됩니다.',
            duration: 5000,
          },
        },
      ]}
    />
  ),
}

/**
 * 스택 형태의 ToastMessage 테스트
 */
export const Stacked: Story = {
  name: '토스트 쌓기',
  render: () => {
    const { showToast } = useToast()
    let count = 0
    const handleClick = () => {
      count++
      showToast({
        message: `메시지 #${count}`,
        position: 'bottom-right',
        messageType: count % 3 === 1 ? 'success' : count % 3 === 2 ? 'fail' : 'error',
      })
    }
    return <Button label="토스트 계속 추가하기" onClick={handleClick} />
  },
}
