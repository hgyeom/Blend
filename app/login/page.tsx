'use client'

import { useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { FaGithub } from 'react-icons/fa'
import { FcGoogle } from 'react-icons/fc'

import { Button } from '@/components/ui/button'
import { emailCheck, signIn, signUp } from '@/utils/supabase/actions'
import { supabaseBrowser } from '@/utils/supabase/client'

import SubmitButton from './submit-button'

const Login = ({ searchParams }: { searchParams: { message: string } }) => {
  // 접근 불가능한 페이지 접근 후 로그인 시 이전 페이지로 이동하기 위해 next 사용
  const params = useSearchParams()
  const next = params.get('next')
  const [buttonStep, setButtonStep] = useState(0)

  // 중복 확인 및 로그인, 회원가입 여부
  const handleEmailCheck = async (formData: FormData) => {
    const step = await emailCheck(formData)
    setButtonStep(step)
  }

  const handleLoginWithOAuth = (provider: 'github' | 'google') => {
    const supabase = supabaseBrowser()
    supabase.auth.signInWithOAuth({
      provider,
      options: {
        // eslint-disable-next-line no-restricted-globals
        redirectTo: `${location.origin}/auth/callback?next=${next}`,
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
          {buttonStep === 1 && (
            <>
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
            </>
          )}
          {buttonStep === 2 && (
            <>
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
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="text-md" htmlFor="nickname">
                닉네임
              </label>
              <input
                className="rounded-md px-4 py-2 bg-inherit border mb-6"
                id="nickname"
                name="nickname"
                placeholder="닉네임"
                required
              />
            </>
          )}

          {/* 이메일 check 결과에 따라 다른 렌더링. */}
          {/* 에러 메시지 다음 눌렀을 때 사라지도록 변경하기 */}
          <SubmitButton
            // eslint-disable-next-line no-nested-ternary
            formAction={buttonStep === 0 ? handleEmailCheck : buttonStep === 1 ? signIn : signUp}
            className="bg-purple-700 text-white rounded-md px-4 py-2 text-foreground mb-2"
            pendingText={
              // eslint-disable-next-line no-nested-ternary
              buttonStep === 0 ? '중복 확인중' : buttonStep === 1 ? '로그인중' : '이메일 전송중'
            }
          >
            {
              // eslint-disable-next-line no-nested-ternary
              buttonStep === 0 ? '다음' : buttonStep === 1 ? '로그인' : '회원가입'
            }
          </SubmitButton>
          {searchParams?.message && (
            <p
              style={{ whiteSpace: 'pre-line' }}
              className="mt-4 p-4 bg-foreground/10 text-foreground text-center"
            >
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
