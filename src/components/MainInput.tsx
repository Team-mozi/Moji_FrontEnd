import React, { useState } from 'react'

import mainEmoji from '../assets/main_emoji.svg'

type MainInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  onKeyPress?: (e: React.KeyboardEvent) => void
  className?: string
  maxLength?: number
  showMainEmoji?: boolean
}

const MainInput: React.FC<MainInputProps> = ({
  className = '',
  maxLength = 100,
  onChange,
  onKeyPress,
  placeholder = '내용을 작성해주세요.',
  showMainEmoji = true,
  value,
}) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className='relative flex-1'>
      {showMainEmoji && (
        <div className='absolute left-4 top-1/2 -translate-y-1/2 z-10'>
          <img src={mainEmoji} alt='main emoji' className='w-6 h-6' />
        </div>
      )}
      <input
        className={`w-full h-14 border rounded-xl py-2 pr-16 text-medium shadow-md transition-colors duration-400 ${
          showMainEmoji ? 'pl-16' : 'px-4'
        } ${
          isFocused
            ? 'border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-200'
            : 'border-gray-300'
        } ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={onKeyPress}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        maxLength={maxLength}
      />
      <div className='absolute right-6 top-1/2 -translate-y-1/2  text-medium text-gray_two'>
        {value.length}/{maxLength}
      </div>
    </div>
  )
}

export default MainInput
