// 'use client';
import AuthButton from '@/components/AuthButton';
import ModeToggle from '@/components/ModeToggle';
import { GiCoffeePot } from 'react-icons/gi';
import Link from 'next/link';

// header 말고 적당한 이름 찾기
export default function Header() {
  return (
    <nav className="w-full flex justify-center items-center border-b border-b-foreground/10 h-14">
      <Link href="/">
        <GiCoffeePot size="40" />
      </Link>

      <div className="w-full max-w-4xl flex justify-end items-center p-3 text-sm gap-4">
        {/* auth 버튼 보여주는게 문제. 어떻게 해결하지? */}
        <AuthButton />
        <ModeToggle />
      </div>
    </nav>
  );
}
