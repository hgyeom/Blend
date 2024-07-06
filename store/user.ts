import { create } from 'zustand'

const userStore = create((set) => ({
  user: {
    nickName: 'rian',
  },
}))

export default userStore
