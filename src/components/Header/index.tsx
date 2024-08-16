import React from 'react'
import Link from 'next/link';
import { LogOut } from 'lucide-react';

const Header = () => {
  return (
    <header className='px-4 h-[50px] w-full flex justify-between items-center bg-[#fafafa] shadow-sm'>
      <Link href="/home">
        <h1 className='cursor-pointer text-xl'>Note<span className='text-purple-600'>App</span></h1>
      </Link>

      <div className='cursor-pointer'>
        <LogOut />
      </div>
    </header>
  )
}

export default Header;