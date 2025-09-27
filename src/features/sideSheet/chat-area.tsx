import React from 'react'

import ChatBubble from '@/features/sideSheet/chat-bubble'

type ChatAreaProps = {
  messages: string[]
}

// 현재 로그인한 사용자 ID
const currentUserId = '가영님 (me)'

// 채팅 메시지 목 데이터
const mockMessages = [
  {
    message: '와 맛있겠네 ;; ',
    senderId: '준영님',
    timestamp: new Date('2025-09-27T15:50:00'),
  },
  {
    message: 'ㅋㅋㅋㅋㅋ',
    senderId: '도연님',
    timestamp: new Date('2025-09-27T15:55:00'),
  },
  {
    message: '한번 드셔보세요! 맛있어요!!',
    senderId: '가영님 (me)',
    timestamp: new Date('2025-09-27T20:00:00'),
  },
]

const ChatArea: React.FC<ChatAreaProps> = ({ messages }) => {
  // (임시) 목데이터를 사용 노출
  const displayMessages =
    messages.length === 0
      ? mockMessages
      : messages.map((msg) => ({
          message: msg,
          senderId: currentUserId,
          timestamp: new Date(),
        }))

  return (
    <div className='space-y-2'>
      {displayMessages.length === 0 ? (
        <div className='text-center text-gray-500 py-8'>
          아직 댓글이 없습니다. 첫 댓글을 작성해보세요!
        </div>
      ) : (
        displayMessages.map((msg, index) => (
          <ChatBubble
            key={index}
            senderId={msg.senderId}
            message={msg.message}
            timestamp={msg.timestamp}
            currentUserId={currentUserId}
          />
        ))
      )}
    </div>
  )
}

export default ChatArea
