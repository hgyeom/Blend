'use server'

import { supabaseServer } from '@/utils/supabase/server'

// 생성일 기준으로 모든 포스트 fetch
export const getAllPosts = async (pageParam: number, pageSize: number) => {
  const supabase = supabaseServer()

  const { data, count, error } = await supabase
    .from('posts')
    .select('*,users!inner(nickname,penname,profile_url)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range((pageParam - 1) * pageSize, pageParam * pageSize - 1)

  if (error) {
    throw new Error(error.message)
  }

  return { data, count }
}
