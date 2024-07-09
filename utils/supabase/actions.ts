'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

// import { supabaseBrowser } from './client'
import { supabaseServer } from './server'

// // 이메일 확인
export const emailCheck = async (formData: FormData) => {
  'use server'

  const email = formData.get('email') as string

  const supabase = supabaseServer()
  const { data } = await supabase.from('users').select('*').eq('email', email).single()

  if (data?.type === 'oAuth') {
    const message = encodeURIComponent('SNS 계정으로 가입되어있습니다.\n SNS로 로그인해주세요.')
    return redirect(`/login?message=${message}`)
  }
  return data ? 1 : 2
}

// 로그인
export const signIn = async (formData: FormData) => {
  'use server'

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = supabaseServer()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    // 파라미터로 에러 보내기.
    const message = encodeURIComponent('이메일 또는 비밀번호가 맞지 않습니다.')
    return redirect(`/login?message=${message}`)
  }

  // 새로고침 해야만 헤더가 바뀐다. 나중에 수정하자.
  return redirect('/')
}

// 회원가입
export const signUp = async (formData: FormData) => {
  'use server'

  const origin = headers().get('origin')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const nickname = formData.get('nickname') as string
  const supabase = supabaseServer()

  const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/
  const passwordRegex = /^.{6,12}$/

  if (!regex.test(email)) {
    const message = encodeURIComponent('이메일 형식을 확인해주세요.')
    return redirect(`/login?message=${message}`)
  }

  if (!passwordRegex.test(password)) {
    const message = encodeURIComponent('비밀번호는 6~12자로 입력해주세요.')
    return redirect(`/login?message=${message}`)
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        nickname,
      },
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  // 계속 이메일 전송 횟수 초과 오류가 발생한다. 원인 찾아보자
  if (error) {
    const message = encodeURIComponent('회원가입중 오류가 발생했습니다.')
    return redirect(`/login?message=${message}`)
  }

  return redirect('/')
  // 중복되는 이메일 에러로 인해 이메일 가입을 꺼놨다.
  // 이메일 인증 횟수가 적어서 그런듯 한데, 5시간 후에 시도해도 오류가 나와서 주석처리.
  // return redirect('/login?message=이메일을 확인하여 회원가입을 완료해주세요!')
}
