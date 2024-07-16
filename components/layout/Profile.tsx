'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'

import useUser from '@/app/hooks/useUser'
import { supabaseBrowser } from '@/utils/supabase/client'
import { useQueryClient } from '@tanstack/react-query'

import { Button } from '../ui/button'

const Profile = () => {
  const { isFetching, data } = useUser()
  const queryClient = useQueryClient()
  const router = useRouter()
  const pathname = usePathname()

  if (isFetching) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <></>
  }

  // queryClient.clear를 사용하기 위해 actions에서 profile로 함수 이동.
  const handleLogOut = async () => {
    const supabase = supabaseBrowser()
    queryClient.clear()
    await supabase.auth.signOut()
    router.refresh()
  }

  return !data?.id ? (
    <Link href={`/login?next=${pathname}`}>
      <Button variant="outline">로그인</Button>
    </Link>
  ) : (
    <div className="flex items-center gap-4">
      {data?.profile_url ? (
        <Image
          src={data.profile_url || ''}
          alt={data.nickname || ''}
          width={40}
          height={40}
          className="rounded-full"
        />
      ) : (
        <div className="h-[30px] px-2 flex items-center justify-center ring-2 rounded-full">
          {data.nickname}
        </div>
      )}

      <form action={handleLogOut}>
        <Button variant="outline">로그아웃</Button>
      </form>
    </div>
  )
}

export default Profile
