'use client'

import Image from 'next/image'

import { useInfiniteScroll } from '@/app/hooks/useInfiniteScroll'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { getAllPosts } from '@/lib/api/posts'
import formatTimeAgo from '@/utils/formatTimeAgo'
import { useInfiniteQuery } from '@tanstack/react-query'

const MainPage = () => {
  const pageSize = 7

  const {
    data: allPosts,
    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['allPosts'],
    queryFn: ({ pageParam = 1 }) => getAllPosts(pageParam, pageSize),
    getNextPageParam: (lastPage, __, lastPageParam) => {
      if (lastPage.data.length < pageSize) return undefined

      const totalPages = Math.ceil(lastPage.count! / pageSize) // 전체 페이지 수 계산
      if (lastPageParam >= totalPages) {
        return undefined // 마지막 페이지를 넘어서지 않도록 설정
      }
      return lastPageParam + 1
    },
    initialPageParam: 1, // 초기 페이지  설정
  })

  const { observerEl, isLoading } = useInfiniteScroll({
    callbackFn: () => {
      if (!isLoading) {
        fetchNextPage()
      }
    },
    hasNextPage,
  })

  const flattenedData = allPosts?.pages.flatMap((page) => page.data) ?? []

  return (
    <>
      <div className="flex mt-10 w-full">
        <Tabs defaultValue="new" className="w-full">
          <TabsList>
            <TabsTrigger value="new">최신순</TabsTrigger>
            <TabsTrigger value="trending">트렌딩</TabsTrigger>
          </TabsList>
          <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-4" />

          <div className="flex flex-col md:flex-row gap-2 ">
            {/* 탭에 따라 fetch 옵션 변경하기  */}
            <TabsContent value="new" className="w-4/5">
              {/* 스켈레톤 만들기 */}
              {isFetching && flattenedData.length === 0 ? (
                <div>로딩</div>
              ) : (
                flattenedData!.map((post) => (
                  <div key={post.id} className="flex flex-col my-2 gap-3 border-b border-solid">
                    <div>
                      {post?.users.profile_url ? (
                        // 추후 기본 이미지 추가하기
                        <div className="flex gap-2 items-center mt-7">
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
                    {/* 제목, 내용 등 */}
                    <div className="flex flex-col gap-3 pb-2">
                      <h3 className="font-bold">{post.title}</h3>
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
      <div className="mt-20" ref={observerEl} />
    </>
  )
}

export default MainPage
