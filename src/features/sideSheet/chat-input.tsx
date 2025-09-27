import React from 'react'

import MainInput from '../../components/MainInput'
import SendButton from '../../components/SendButton'

type ChatInputProps = {
  inputValue: string
  onInputChange: (value: string) => void
  onSendMessage: () => void
}

const ChatInput: React.FC<ChatInputProps> = ({
  inputValue,
  onInputChange,
  onSendMessage,
}) => {
  return (
    <div className='flex items-center gap-3 min-h-[75px] w-full'>
      <MainInput
        value={inputValue}
        onChange={onInputChange}
        onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
      />
      <SendButton onClick={onSendMessage} />
    </div>
  )
}

export default ChatInput
