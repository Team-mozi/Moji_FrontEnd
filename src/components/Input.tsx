import React, { useState } from 'react'

type InputProps = {
  label: string // 라벨 텍스트 (예: "이메일", "비밀번호")
  name: string // input name-id 값 (폼 제출 시 key로 사용)
  type?: 'text' | 'email' | 'password' // input 타입 (기본값: text)
  placeholder?: string // placeholder 텍스트
  required?: boolean // 필수 입력 여부
  onChange?: (value: string) => void // 값 변경 시 실행되는 콜백
  isConfirmPassword?: boolean // 비밀번호 확인용 여부 (true일 경우 규칙 검증 스킵)
  className?: string // 스타일 커스터마이징 (width 길이 설정 권장)
  maxLength?: number // 최대 입력 길이 (이 값이 있을 때만 길이 표시)
  hasShadow?: boolean // 그림자 효과 여부
}

const Input = ({
  className = '',
  isConfirmPassword = false,
  label,
  name,
  onChange,
  placeholder,
  required = false,
  type = 'text',
  maxLength,
  hasShadow = false,
}: InputProps) => {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  const validate = (inputValue: string) => {
    if (isConfirmPassword) return ''

    if (type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(inputValue)) {
        return '이메일 주소를 정확히 입력해주세요.'
      }
    }

    if (type === 'password') {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/
      if (!passwordRegex.test(inputValue)) {
        return '8자 이상, 대소문자, 숫자, 특수문자를 포함해야 합니다.'
      }
    }

    return ''
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setValue(inputValue)

    const validationError = validate(inputValue)
    setError(validationError)

    if (onChange) onChange(inputValue)
  }

  // maxLength prop의 유무에 따라 input의 padding-right 값을 동적으로 결정
  const inputPaddingRightClass = maxLength ? 'pr-14' : 'pr-4'

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className='font-medium text-sm sm:text-base text-black'
        >
          {label}
        </label>
      )}
      <div className='relative'>
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          value={value}
          onChange={handleChange}
          maxLength={maxLength}
          className={`h-12 border rounded-xl px-4 transition-colors duration-300 focus:outline-none focus:ring-1 hover:border-orange_three font-normal text-sm sm:text-base 
            ${hasShadow ? 'shadow-md' : ''}
            ${error ? 'focus:ring-red_one' : ' focus:ring-orange_three'}
            ${inputPaddingRightClass}
            placeholder-gray_one
            placeholder:font-normal
            w-full`}
        />
        {maxLength && (
          <span className='absolute right-4 top-1/2 -translate-y-1/2 text-gray_one text-xs pointer-events-none'>
            {value.length}/{maxLength}
          </span>
        )}
      </div>
      {!isConfirmPassword && error && (
        <p className='text-xs sm:text-sm text-red_one'>{error}</p>
      )}
    </div>
  )
}

export default Input
