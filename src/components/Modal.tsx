import { motion, AnimatePresence } from 'framer-motion'

interface ModalProps {
  children: React.ReactNode
  className?: string
  isOpen: boolean // 모달창 띄우기
  size?: 'sm' | 'md' // 사이즈
}

const Modal = ({
  children,
  className = '',
  isOpen,
  size = 'md',
}: ModalProps) => {
  const sizeClass =
    size === 'sm' ? 'w-[280px]' : size === 'md' ? 'w-[580px]' : ''

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='fixed inset-0 z-50 flex items-center justify-center'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {/* 배경 */}
          <motion.div
            className='absolute inset-0 bg-black/50'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* 모달 컨텐츠 */}
          <motion.div
            className={`bg-white p-16 rounded-xl z-10 ${sizeClass} ${className}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Modal
