import { useContext } from 'react';
import { ToastContext } from '../components/ToastProvider';

/**
 * Toast Message Hooks
 * - 성공 메시지 전송
 * - 실패 메시지 전송
 * - 에러 메시지 전송
 */
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};