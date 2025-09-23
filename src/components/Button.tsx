/**
 * Button 컴포넌트가 받을 수 있는 props의 타입을 정의합니다.
 */
type ButtonProps = {
  label: string // 버튼에 표시될 텍스트입니다.
  onClick?: () => void // 버튼 클릭 시 실행될 함수입니다.
  className?: string // Tailwind CSS 클래스를 추가하여 스타일을 커스텀할 수 있습니다.
  type?: 'button' | 'submit' // 버튼의 HTML 타입을 지정합니다. (기본값: 'button')
  baseButton?: boolean // 이 값이 true일 경우, 주황버튼 색상 스타일이 적용됩니다.
  size?: 's' | 'm' | 'l' // 버튼의 크기 ('s', 'm', 'l')를 설정합니다. (기본값: 'full')
}

const Button = ({
  label,
  onClick,
  className = '',
  type = 'button',
  baseButton = false,
  size,
}: ButtonProps) => {
  // 모든 버튼에 공통으로 적용되는 기본 스타일들을 정의합니다.
  const baseClasses = `
    h-12
    rounded-xl px-4 text-sm sm:text-base font-[350]
    focus:outline-none transition-colors duration-300
  `

  // size prop에 따라 다르게 적용되는 너비 스타일을 정의합니다.
  const buttonSizeClasses =
    size === 's'
      ? 'w-[140px]' // 140px
      : size === 'm'
        ? 'w-40 ' // 160px
        : size === 'l'
          ? 'w-[448px]' // 448px
          : 'w-full' // 기본값: w-full

  // baseButton prop 값에 따라 다르게 적용되는 색상 스타일을 정의합니다.
  const colorClasses = baseButton
    ? 'bg-orange_three text-black hover:bg-orange_four' // baseButton 상태일 때 주황색 배경, 검정 텍스트
    : 'bg-white border border-orange_three text-orange_five hover:border-orange_five ' // 기본 상태일 때 흰색 배경, 주황색 테두리

  return (
    <button
      type={type}
      onClick={onClick}
      // 기본 스타일, 색상 스타일, 너비 스타일, 그리고 사용자가 추가한 커스텀 스타일을 조합하여 적용합니다.
      className={`${baseClasses} ${colorClasses} ${buttonSizeClasses} ${className}`}
    >
      {label}
    </button>
  )
}

export default Button
