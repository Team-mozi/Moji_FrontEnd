import { createContext, useState, useCallback, type ReactNode } from 'react';
import Toast, { type ToastPosition, type ToastProps } from './Toast';

export interface ToastContextValue {
  showToast: (props: ToastProps) => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

type ToastState = Required<Pick<ToastProps, 'id'>> & Omit<ToastProps, 'id'>;

/**
 * Toast Message 공급자 컴포넌트
 * 
 * 특정 동작(Button etc.)으로 인한 결과값을 메시지로 출력하고 싶을 때 사용됩니다.
 */
const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastState[]>([]);

  // Toast Message를 목록에서 제거하는 함수
  const removeToast = useCallback((id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }, []);

  // 새로운 Toast Message를 추가하는 함수
  const showToast = useCallback((props: ToastProps) => {
    const id = Date.now();
    const newToast: ToastState = {
      id,
      message: props.message,
      messageType: props.messageType || 'success',
      size: props.size || 'm',
      duration: props.duration || 2000,
      position: props.position || 'top-center',
      className: props.className,
    };
    setToasts((prevToasts) => [...prevToasts, newToast]);
  }, []);

  // 위치별로 Toast Message 그룹화
  const toastsByPosition = toasts.reduce((acc, toast) => {
    const position = toast.position || 'top-center';
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(toast);
    return acc;
  }, {} as Record<ToastPosition, ToastState[]>);

  // 위치별 스타일 매핑
  const positionClasses: Record<ToastPosition, string> = {
    'top-center': 'top-5 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-5 left-1/2 -translate-x-1/2',
    'bottom-left': 'bottom-5 left-5',
    'bottom-right': 'bottom-5 right-5',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {Object.entries(toastsByPosition).map(([position, positionToasts]) => (
        <div
          key={position}
          className={`fixed z-50 flex flex-col gap-2 ${positionClasses[position as ToastPosition]}`}
        >
          {positionToasts.map((toast) => (
            <Toast key={toast.id} {...toast} onDismiss={() => removeToast(toast.id)} />
          ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};

export default ToastProvider;