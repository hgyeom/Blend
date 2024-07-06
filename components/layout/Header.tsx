// 'use client';
import Link from 'next/link'
import { GiCoffeePot } from 'react-icons/gi'

import AuthButton from '@/components/AuthButton'
import ModeToggle from '@/components/ModeToggle'

const Header = () => {
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
  )
}

export default Header
