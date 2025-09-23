export interface ButtonProps {
  // 버튼 크기 선택: Tailwind 사이즈 프리셋
  size?: 'small' | 'medium' | 'large'
  // 추가 Tailwind 클래스 (예: 'w-full')
  className?: string
  // 버튼에 표시될 텍스트
  label: string
  // 클릭 핸들러
  onClick?: () => void
  // 버튼 비활성화 여부
  disabled?: boolean
}

// Tailwind 기반 버튼 컴포넌트
export const Button = ({
  size = 'medium',
  className = '',
  label,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const baseClasses =
    'inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const sizeClasses =
    size === 'small'
      ? 'px-3 py-2 text-xs'
      : size === 'large'
        ? 'px-5 py-3 text-base'
        : 'px-4 py-2.5 text-sm'

  // 단일 변형: 주황 배경 + 검은 텍스트
  const variantClasses =
    'bg-orange-500 text-black hover:bg-orange-600 focus:ring-orange-500'

  return (
    <button
      type='button'
      className={[baseClasses, sizeClasses, variantClasses, className].join(
        ' ',
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  )
}
