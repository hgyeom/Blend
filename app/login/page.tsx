'use client'

import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { signIn, signUp } from '@/utils/supabase/actions'
import { supabaseBrowser } from '@/utils/supabase/client'

import { SubmitButton } from './submit-button'

export const Login = ({ searchParams }: { searchParams: { message: string } }) => {
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
      <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
        {/* <Link
          href="/"
          className="absolute left-8 top-11 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Back
        </Link> */}

        <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
          <label htmlFor="email" className="text-md">
            Email
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              id="email"
              name="email"
              placeholder="you@example.com"
              required
            />
          </label>
          <label className="text-md" htmlFor="Nickname">
            Nickname
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              name="Nickname"
              placeholder="ABC"
              required
            />
          </label>
          <label className="text-md" htmlFor="password">
            Password
            <input
              className="rounded-md px-4 py-2 bg-inherit border mb-6"
              type="password"
              name="password"
              placeholder="••••••••"
              required
            />
          </label>
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
