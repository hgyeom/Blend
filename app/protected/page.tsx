// protected 마이페이지로 사용 > 이름 변경하기

// import { redirect } from 'next/navigation'

// import AuthButton from '@/components/AuthButton'
// import { supabaseServer } from '@/utils/supabase/server'

const ProtectedPage = async () => {
  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      {/* <div className="w-full">
        <div className="py-6 font-bold bg-purple-950 text-center">
          This is a protected page that you can only see as an authenticated
          user
        </div>
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
            <AuthButton />
          </div>
        </nav>
      </div>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">중간 지점</h2>
        </main>
      </div> */}
    </div>
  )
}
export default ProtectedPage
