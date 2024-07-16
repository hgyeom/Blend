import { toastStore, ToastProps, ToastOptionProps } from '@/store/toast'

// option = position같은 스타일. 현재는 position만 설정.
export const useToast = (option?: ToastOptionProps) => {
  const { actions } = toastStore()

  const addToast = (type: ToastProps['type']) => (title: ToastProps['title']) => {
    const newToast: ToastProps = {
      id: Date.now().toString(),
      title,
      type,
    }
    actions.addToasts(newToast) // 새로운 토스트 메시지 추가
  }

  return {
    success: addToast('success'),
    warning: addToast('warning'),
  }
}
