'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GiCoffeePot } from 'react-icons/gi'

import ModeToggle from '@/components/ModeToggle'

import Profile from './Profile'

const Navbar = () => {
  const pathname = usePathname()

  return pathname === '/login' ? (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <></>
  ) : (
    <nav className="w-full flex justify-center items-center border-b border-b-foreground/10 h-14">
      <Link href="/">
        <GiCoffeePot size="40" />
      </Link>

      <div className="w-full max-w-6xl flex justify-end items-center p-3 text-sm gap-4">
        {/* auth 버튼 보여주는게 문제. 어떻게 해결하지? */}
        <Profile />
        <ModeToggle />
      </div>
    </nav>
  )
}

export default Navbar
