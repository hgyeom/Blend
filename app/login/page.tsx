'use client'

// import { useRouter } from 'next/navigation'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { signIn, signUp } from '@/utils/supabase/actions'
import { supabaseBrowser } from '@/utils/supabase/client'

import SubmitButton from './submit-button'

const Login = ({ searchParams }: { searchParams: { message: string } }) => {
  const handleLoginWithOAuth = (provider: 'github' | 'google') => {
    const supabase = supabaseBrowser()
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        // eslint-disable-next-line no-restricted-globals
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    })
  }

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-3">
        <div className="flex flex-col gap-16 items-center">
          <div className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
            <div>
              <a href="/" className="font-bold hover:underline">
                Blend
              </a>
            </div>
            Mix, Shared Life
          </div>
        </div>
        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          {/* html for에 입력해도 오류가 난다. eslint 원인 찾아보자. */}
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="text-md " htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            id="email"
            name="email"
            placeholder="you@example.com"
            required
          />
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />

          {/* 닉네임은 자동 생성 > 나중에 수정 할 수 있도록 */}
          {/* <label className="text-md" htmlFor="nickname">
            Nickname
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              id="nickname"
              name="nickname"
              placeholder="닉네임"
              required
            />
          </label> */}
          <SubmitButton
            formAction={signIn}
            className="bg-purple-700 text-white rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing In..."
          >
            로그인
          </SubmitButton>
          <SubmitButton
            formAction={signUp}
            className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
            pendingText="Signing Up..."
          >
            회원가입
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
        <div className="flex flex-col items-center gap-2">
          SNS계정으로 로그인
          <div className="flex gap-3">
            <Button
              className="w-full flex items-center gap-2"
              variant="outline"
              onClick={() => handleLoginWithOAuth('google')}
            >
              <FcGoogle /> Google
            </Button>
            <Button
              className="w-full flex items-center gap-2 "
              variant="outline"
              onClick={() => handleLoginWithOAuth('github')}
            >
              <FaGithub /> Github
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
