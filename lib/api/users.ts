'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

// import { supabaseBrowser } from './client'

import { supabaseServer } from '@/utils/supabase/server'

// email로 유저 중복 확인
export const emailCheck = async (email: string) => {
  'use server'

  const supabase = supabaseServer()
  const { data } = await supabase.from('users').select('*').eq('email', email).single()

  return data
}

// penname으로 유저 정보 얻기
export const getUserWithPenname = async (penname: string) => {
  'use server'

  const supabase = supabaseServer()
  const { data: user } = await supabase.from('users').select('*').eq('penname', penname).single()
  return user || null
}

// 로그인
export const signIn = async (formData: FormData) => {
  'use server'

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const next = formData.get('next') as string
  const supabase = supabaseServer()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return error
  }

  // 새로고침 해야만 헤더가 바뀐다. 나중에 수정하자.
  return redirect(next || '/')
}

// 회원가입
export const signUp = async (formData: FormData) => {
  'use server'

  const origin = headers().get('origin')
  const profileUrl = '/svgs/default_user.svg'
  const next = formData.get('next') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const nickname = formData.get('nickname') as string
  const penname = formData.get('penname') as string
  const supabase = supabaseServer()

  const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
  const passwordRegex = /^.{6,12}$/

  if (!regex.test(email)) {
    const message = encodeURIComponent('이메일 형식을 확인해주세요.')

    // 이 부분 toast로 변경하자.
    return redirect(`/login?message=${message}`)
  }

  if (!passwordRegex.test(password)) {
    const message = encodeURIComponent('비밀번호는 6~12자로 입력해주세요.')
    return redirect(`/login?message=${message}`)
  }

  const data = await getUserWithPenname(penname)

  if (data) {
    const message = encodeURIComponent('필명이 중복되었습니다.')
    return redirect(`/login?message=${message}`)
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
        penname,
        profile_url: profileUrl,
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  // 계속 이메일 전송 횟수 초과 오류가 발생한다. 원인 찾아보자
  if (error) {
    const message = encodeURIComponent('회원가입중 오류가 발생했습니다.')
    return redirect(`/login?message=${message}`)
  }

  return redirect(next || '/')
  // 중복되는 이메일 에러로 인해 이메일 가입을 꺼놨다.
  // 이메일 인증 횟수가 적어서 그런듯 한데, 5시간 후에 시도해도 오류가 나와서 주석처리.
  // return redirect('/login?message=이메일을 확인하여 회원가입을 완료해주세요!')
}
