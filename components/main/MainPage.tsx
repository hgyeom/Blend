'use client'

// import { getAllPosts } from '@/lib/api/posts'
// import { useInfiniteQuery } from '@tanstack/react-query'
import Image from 'next/image'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAllPostssss } from '@/lib/api/posts'
import formatTimeAgo from '@/utils/formatTimeAgo'
import { useQuery } from '@tanstack/react-query'

const MainPage = () => {
  const { data: posts, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: () => getAllPostssss(),
  })

  return (
    <div className="flex mt-10 w-full">
      <Tabs defaultValue="new" className="w-full	">
        <TabsList>
          <TabsTrigger value="new">최신순</TabsTrigger>
          <TabsTrigger value="trending">트렌딩</TabsTrigger>
        </TabsList>
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-4" />

        <div className="flex flex-col md:flex-row gap-2 ">
          {/* 탭에 따라 fetch 옵션 변경하기  */}
          <TabsContent value="new" className="w-4/5">
            {isFetching ? (
              <div>로딩</div>
            ) : (
              posts!.data.map((post) => (
                <div key={post.id} className="flex flex-col my-2 gap-3">
                  <div>
                    {post?.users.profile_url ? (
                      // 추후 기본 이미지 추가하기
                      <div className="flex gap-2 items-center">
                        <Image
                          src={post.users.profile_url || ''}
                          alt={post.users.nickname || ''}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <h4 className="font-semibold">
                          {post.users.nickname}@{post.users.penname}
                        </h4>
                        <p className="text-xs">{formatTimeAgo(post.created_at)}</p>
                      </div>
                    ) : (
                      <div className="flex gap-2 items-center">
                        <div className="h-[30px]  px-2 flex items-center justify-center ring-2 rounded-full">
                          {post.users.nickname}
                        </div>
                        <h4 className="font-semibold">
                          {post.users.nickname}@{post.users.penname}
                        </h4>
                        <p className="text-xs">{formatTimeAgo(post.created_at)}</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <h3>{post.title}</h3>
                    <p>{post.content}</p>
                  </div>
                </div>
              ))
            )}
          </TabsContent>
          {/* 추후 3일 내 인기있는 글 보여줄 예정. 좋아요 or 조회수 */}
          {/* <TabsContent value="trending">트렌딩</TabsContent> */}

          <div className="w-1/5">네비게이션</div>
        </div>
      </Tabs>
    </div>
  )

  // 무한스크롤 준비
  //   const pageSize = 10
  //   const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
  //     queryKey: ['allPosts'],
  //     queryFn: () => getAllPosts(pageParam, pageSize),
  //     initialPageParam: 1,
  //     getNextPageParam: (lastPage, allPages, lastPageParam) => {
  //       if (lastPageParam < totalPage) {
  //         return lastPageParam + 1
  //       }
  //     },
  //     select: (data) => {
  //       return data.pages.flat()
  //     },
  //   })
}

export default MainPage
