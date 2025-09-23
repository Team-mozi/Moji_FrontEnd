import { Input } from '@/components/Input'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

// Storybook의 기본 메타데이터를 정의합니다.
// 'Components' 그룹 아래에 'Input' 스토리가 위치하게 됩니다.
const meta: Meta<typeof Input> = {
  // 경로를 설정해주시면 됩니다.
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    // Storybook Controls에서 각 prop을 조작할 수 있도록 설정
    label: { control: 'text' },
    name: { control: 'text' },
    type: { control: 'select', options: ['text', 'email', 'password'] },
    placeholder: { control: 'text' },
    required: { control: 'boolean' },
    maxLength: { control: 'number' },
    hasShadow: { control: 'boolean' },
  },
}

export default meta

type Story = StoryObj<typeof Input>

/**
 * 기본 Input 컴포넌트 스토리
 *
 * 가장 기본적인 텍스트 입력 필드를 보여줍니다.
 * 별도의 추가 기능(maxLength, hasShadow) 없이, Input 컴포넌트의 기본 스타일과 동작을 확인하는 용도로 사용됩니다.
 */
export const Default: Story = {
  args: {
    label: '이름',
    name: 'name',
    placeholder: '이름',
  },
}

/**
 * 길이 제한 및 그림자 효과가 있는 Input 스토리 (이모지 글 작성 시 사용)
 *
 * 'maxLength'와 'hasShadow' props가 적용되었을 때의 컴포넌트 상태를 보여줍니다.
 * 사용자가 내용을 입력할 때 실시간으로 글자 수를 확인할 수 있으며,
 * 컴포넌트에 그림자 효과가 적용되어 시각적으로 분리되는 것을 확인할 수 있습니다.
 */
export const Content: Story = {
  args: {
    label: '',
    name: 'content',
    placeholder: '내용을 작성해주세요.',
    maxLength: 100,
    hasShadow: true,
  },
}

/**
 * 이메일 Input 스토리
 *
 * type='email' prop을 사용하여 이메일 형식의 유효성 검사가 적용된 상태를 보여줍니다.
 * 유효하지 않은 이메일 주소를 입력했을 때 경고 메시지가 어떻게 표시되는지 확인할 수 있습니다.
 */
export const Email: Story = {
  args: {
    label: '이메일',
    name: 'email',
    type: 'email',
    placeholder: '이메일',
    required: true,
  },
}

/**
 * 비밀번호 Input 스토리
 *
 * type='password' prop을 사용하여 비밀번호 규칙 유효성 검사가 적용된 상태를 보여줍니다.
 * 8자 이상, 대소문자, 숫자, 특수문자 포함 규칙을 위반했을 때의 오류 메시지를 확인할 수 있습니다.
 */
export const Password: Story = {
  args: {
    label: '비밀번호',
    name: 'password',
    type: 'password',
    placeholder: '비밀번호',
    required: true,
  },
}

/**
 * 비밀번호 일치 확인 Input 스토리
 *
 * 두 개의 Input 컴포넌트(비밀번호, 비밀번호 재확인)가 상호작용하는 복합적인 시나리오를 보여줍니다.
 * 비밀번호와 비밀번호 재확인 값이 일치하지 않을 때,
 * 컴포넌트 외부에 위치한 경고 메시지가 어떻게 표시되는지 확인할 수 있습니다.
 */
export const PasswordConfirmation: Story = {
  render: () => {
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [matchError, setMatchError] = useState('')

    const handlePasswordChange = (value: string) => {
      setPassword(value)
      if (confirmPassword && value !== confirmPassword) {
        setMatchError('비밀번호가 일치하지 않습니다.')
      } else {
        setMatchError('')
      }
    }

    const handleConfirmPasswordChange = (value: string) => {
      setConfirmPassword(value)
      if (password && value !== password) {
        setMatchError('비밀번호가 일치하지 않습니다.')
      } else {
        setMatchError('')
      }
    }

    return (
      <div className='flex flex-col gap-4'>
        <Input
          label='비밀번호'
          name='password'
          type='password'
          placeholder='비밀번호'
          required
          onChange={handlePasswordChange}
        />
        <Input
          label='비밀번호 재확인'
          name='confirmPassword'
          type='password'
          placeholder='비밀번호 재확인'
          required
          onChange={handleConfirmPasswordChange}
          isConfirmPassword // 규칙 검증 끄기
        />
        {matchError && <p className='text-sm text-red-one'>{matchError}</p>}
      </div>
    )
  },
}
