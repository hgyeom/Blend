'use client'

import Link from 'next/link'

import userStore from '@/store/user'
import { signOut } from '@/utils/supabase/actions'
// import { supabaseServer } from '@/utils/supabase/server'

import { Button } from './ui/button'

const AuthButton = () => {
  // state로 변경하자. api 호출 너무 많음.
  // const supabase = supabaseServer()

  // const {
  //   data: { user },
  // } = await supabase.auth.getUser()
  // zustand 기본 사용법
  const user = userStore((state: any) => state.user)

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.nickName}!
      <form action={signOut}>
        <Button variant="outline">Logout</Button>
      </form>
    </div>
  ) : (
    <Button variant="outline">
      <Link href="/login">Login</Link>
    </Button>
  )
}

export default AuthButton
