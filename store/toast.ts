import create from 'zustand'

export type ToastProps = {
  id: string
  title: string
  type: 'info' | 'success' | 'warning' | 'error' // 타입에 맞게 정의
}

type ToastStore = {
  toasts: ToastProps[]
  actions: {
    addToasts: (newToast: ToastProps) => void
    removeToasts: (id: string) => void
  }
}

export type ToastOptionProps = {
  position: string
}

type ToastOptionStore = {
  toastOptions: ToastOptionProps
  setToastOptions: (options: ToastOptionProps) => void
}

export const toastOptionStore = create<ToastOptionStore>((set) => ({
  toastOptions: {
    position: 'bottom-[84px]', // Default value
  },
  setToastOptions: (options) => set({ toastOptions: options }),
}))

export const toastStore = create<ToastStore>((set) => ({
  toasts: [],
  actions: {
    addToasts: (newToast) =>
      set((prev) => ({
        toasts: [...prev.toasts, newToast],
      })),
    removeToasts: (id) =>
      set((prevToast) => ({
        toasts: prevToast.toasts.filter((toast) => toast.id !== id),
      })),
  },
}))
