import Header from '@/components/Header';
import AuthButton from '@/components/AuthButton';
import ModeToggle from '@/components/ModeToggle';
import { createClient } from '@/utils/supabase/server';

export default async function Index() {
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
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm gap-4">
          <AuthButton />
          <ModeToggle />
        </div>
      </nav>

      <div className="flex-1 flex flex-col gap-20 max-w-4xl px-3">
        <Header />
        <main className="flex-1 flex flex-col gap-6">
          <h2 className="font-bold text-4xl mb-4">중간</h2>
        </main>
      </div>
    </div>
  );
}
