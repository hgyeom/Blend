// pages/blog/[penname].tsx

import { getUserWithPenname } from '@/lib/api/users'

const Blog = async ({ params }: { params: { penname: string } }) => {
  // 비동기 데이터 가져오기
  const data = await getUserWithPenname(params.penname)

  if (!data) {
    return <div>없는 계정</div>
  }

  return (
    <div className="flex flex-row gap-20 px-3 border w-full min-h-96">
      <div className="flex flex-col gap-4 w-1/4 border">
        <h2 className="font-bold text-4xl mb-4">중간 지점</h2>
      </div>
      <div className="flex flex-col gap-6 w-3/4 border">
        <p>{data.penname}</p>
      </div>
    </div>
  )
}

export default Blog
