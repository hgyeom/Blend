// import { redirect } from 'next/navigation'

import { getUserWithPenname } from '@/lib/api/users'

// import AuthButton from '@/components/AuthButton'
// import { supabaseServer } from '@/utils/supabase/server'

const Blog = async ({ params }: { params: { penname: string } }) => {
  // const email = decodeURIComponent(params.email)
  getUserWithPenname(params.penname)
  // console.log(params)
  return (
    <div className="flex flex-row gap-20 px-3 border w-full min-h-96">
      <div className="flex flex-col gap-4 w-1/4 border">
        <h2 className="font-bold text-4xl mb-4">중간 지점</h2>
      </div>
      <div className="flex flex-col gap-6 w-3/4 border">테스트</div>
    </div>
  )
}
export default Blog
