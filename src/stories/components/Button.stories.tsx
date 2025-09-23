import { Button } from '@/components/Button'
import type { Meta, StoryFn } from '@storybook/react'

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    label: {
      control: 'text',
      description: '버튼에 표시될 텍스트입니다.',
      defaultValue: '버튼',
    },
    onClick: {
      action: 'clicked',
      description: '버튼 클릭 시 실행되는 함수입니다.',
    },
    primary: {
      control: 'boolean',
      description: '주요(primary) 버튼 스타일을 적용합니다.',
    },
  },
} as Meta

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />

/**
 * 이 스토리는 기본(primary prop이 false) 버튼의 모습을 보여줍니다.
 * 배경이 흰색이고, 주황색 테두리와 텍스트 색상을 가집니다.
 */
export const Default = Template.bind({})
Default.args = {
  label: '회원가입',
  primary: false,
}

/**
 * 이 스토리는 primary 버튼의 모습을 보여줍니다.
 * 배경이 주황색이고, 검은색 텍스트 색상을 가집니다.
 */
export const Primary = Template.bind({})
Primary.args = {
  label: '로그인',
  primary: true,
}
