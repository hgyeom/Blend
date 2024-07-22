'use client'

import { supabaseBrowser } from '@/utils/supabase/client'

// 생성일 기준으로 모든 포스트 fetch
export const getAllPosts = async (pageParam: number, pageSize: number) => {
  const supabase = supabaseBrowser()

  const { data: allPosts, error } = await supabase
    .from('posts')
    .select('*,users!inner(nickname,penname)')
    .order('created_at', { ascending: false })
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1)

  if (error) {
    throw new Error(error.message)
  }

  return allPosts
}

export const getAllPostssss = async () => {
  const supabase = supabaseBrowser()
  try {
    const { data, error, count } = await supabase
      .from('posts')
      .select('*,users!inner(nickname,penname,profile_url)', {
        count: 'exact',
      })
      .order('created_at', { ascending: false })
    if (error) {
      return {
        data: [],
        totalPages: 0,
        count: 0,
      }
    }
    return { data, count }
  } catch (error) {
    return {
      data: [],
      totalPages: 0,
      count: 0,
    }
  }
}
