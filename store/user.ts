import { create } from 'zustand'

import { Database } from '@/lib/types/supabase'

type TUserState = {
  userInfo: Database['public']['Tables']['users']['Row'] | null
  setUserInfo: (user: Database['public']['Tables']['users']['Row'] | null) => void
  deleteUserInfo: () => void
}

const userStore = create<TUserState>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => {
    set({ userInfo })
  },
  deleteUserInfo: () => {
    set({ userInfo: null })
  },
}))

export default userStore
