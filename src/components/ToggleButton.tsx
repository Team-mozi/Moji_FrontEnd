import React from 'react'

type ToggleButtonProps = {
  isExpanded: boolean
  onToggle: () => void
  expandedText?: string
  collapsedText?: string
  className?: string
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  className = '',
  collapsedText = '확대하기',
  expandedText = '축소하기',
  isExpanded,
  onToggle,
}) => {
  return (
    <div className='flex justify-center mb-4'>
      <button
        type='button'
        onClick={onToggle}
        className={`px-2 py-1 text-xs bg-white text-orange_five border-2 border-orange_three rounded-full shadow-sm w-40 h-6 transition-colors hover:bg-orange-50 ${className}`}
      >
        {isExpanded ? expandedText : collapsedText}
      </button>
    </div>
  )
}

export default ToggleButton
