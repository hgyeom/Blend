// import { createClient } from '@/utils/supabase/server';

import MainPage from '@/components/main/MainPage'

const Index = async () => {
  // supabase와 연결되어있는지 확인하는 함수
  // const canInitSupabaseClient = () => {
  //   // This function is just for the interactive tutorial.
  //   // Feel free to remove it once you have Supabase connected.
  //   try {
  //     createClient();
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // };

  // const isSupabaseConnected = canInitSupabaseClient();

  return (
    <div className="flex-1 w-full flex flex-col gap-5 items-center">
      <MainPage />
      {/* <div className="flex flex-col gap-16 items-center">
        <div className="text-3xl lg:text-4xl !leading-tight mx-auto mt-10 max-w-xl text-center" />
        
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      </div>
      <div className="flex-1 flex flex-col gap-10 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          
        </main>
      </div> */}
    </div>
  )
}

export default Index
