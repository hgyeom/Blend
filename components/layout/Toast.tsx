'use client'

import { useEffect, useState } from 'react'

import { ToastProps, toastStore } from '@/store/toast'

const TOAST_DURATION = 3000
const ANIMATION_DURATION = 350

const Toast = ({ id, title, type }: ToastProps) => {
  const [opacity, setOpacity] = useState('opacity-[0.2]')
  const { actions } = toastStore()

  useEffect(() => {
    setOpacity('opacity-[0.8]')
    const timeoutForRemove = setTimeout(() => {
      actions.removeToasts(id)
    }, TOAST_DURATION)

    const timeoutForVisible = setTimeout(() => {
      setOpacity('opacity-0')
    }, TOAST_DURATION - ANIMATION_DURATION)

    return () => {
      clearTimeout(timeoutForRemove)
      clearTimeout(timeoutForVisible)
    }
  }, [id, actions.removeToasts])

  // eslint-disable-next-line consistent-return
  const emoji = () => {
    if (type === 'success') {
      return '😀'
    }
    if (type === 'warning') {
      return '😥'
    }
  }
  return (
    <div
      className={`w-fit flex gap-5xs justify-center items-center text-background px-3 py-2 bg-foreground rounded-[12px] mb-5xs transition-all duration-350 ease-in-out ${opacity}`}
    >
      <span className="material-icons-outlined">{emoji()}</span>
      <div className="ml-[7px] ">{title}</div>
    </div>
  )
}

export default Toast
