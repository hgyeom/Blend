// import { createClient } from '@/utils/supabase/server';

import { GiCoffeePot } from 'react-icons/gi'

export const Index = async () => {
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
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="flex flex-col gap-16 items-center">
        <GiCoffeePot size="40" />
        <div className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
          <p className="font-bold hover:underline">Blend</p> Mix, Shared Life
        </div>
        {/* 선 긋는 div */}

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
      </div>
      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">중간</h2>
        </main>
      </div>
    </div>
  )
}
