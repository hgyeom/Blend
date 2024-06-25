import SupabaseLogo from './SupabaseLogo';

// header 말고 적당한 이름 찾기
export default function Header() {
  return (
    <div className="flex flex-col gap-16 items-center">
      <div className="flex gap-8 justify-center items-center">
        <a
          href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
          target="_blank"
          rel="noreferrer"
        >
          {/* 나중에 로고 변경하기 */}
          <SupabaseLogo />
        </a>
        <span className="border-l rotate-45 h-6" />
      </div>
      <div className="text-3xl lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        <p className="font-bold hover:underline">Blend</p> Mix, Shared Life
      </div>
      {/* 선 긋는 div */}
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
