import { type NextRequest, NextResponse } from 'next/server'

import { createServerClient, type CookieOptions } from '@supabase/ssr'

export const updateSession = async (request: NextRequest) => {
  // Create an unmodified response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: '',
            ...options,
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // 세션이 만료된 경우 갱신- 서버 컴포넌트에 필요
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  await supabase.auth.getUser()

  return response
}

// protected
export async function authCheckAndRedirect(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // createServerClient와 supabase.auth.getUser() 사이에 로직 작성 금지. 로그아웃 문제 발생 가능.

  const { data } = await supabase.auth.getSession()
  const url = new URL(request.url)

  if (data.session) {
    if (url.pathname === '/login') {
      return NextResponse.redirect(new URL('/', request.url))
    }
    return supabaseResponse
  }

  if (url.pathname === '/protected') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 나중에 글 등록 등 로그인 필요한 페이지로 이동할 경우
  // else{
  //   if(url.pathname === '/login')
  // }

  return supabaseResponse
}
