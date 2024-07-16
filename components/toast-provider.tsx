'use client'

import { toastOptionStore, toastStore } from '@/store/toast'

import Toast from './layout/Toast'

export const ToastProvider = () => {
  const { toasts } = toastStore((state) => ({
    toasts: state.toasts,
  }))

  // 옵션. position이 먹히지 않음. 수정 필요.
  //   const { toastOptions } = toastOptionStore()
  return (
    <div className="fixed bottom-[84px] left-1/2 transform translate-x-[-50%]">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} />
      ))}
    </div>
  )
}
