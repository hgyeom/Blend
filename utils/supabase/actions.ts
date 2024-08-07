'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

// import { supabaseBrowser } from './client'
import { supabaseServer } from './server'

export const signOut = async () => {
  const supabase = supabaseServer()
  await supabase.auth.signOut()
  return redirect('/login')
}

export const signIn = async (formData: FormData) => {
  'use server'

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = supabaseServer()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  return redirect('/')
}

export const signUp = async (formData: FormData) => {
  'use server'

  const origin = headers().get('origin')
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const supabase = supabaseServer()

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return redirect('/login?message=Could not authenticate user')
  }

  return redirect('/login?message=Check email to continue sign in process')
}
