'use client'
import Image from 'next/image'
import React from 'react'
import Avatar from '../assets/Avatar.jpg'
type HeaderProps = {}

const Header: React.FC<HeaderProps> = () => {
  return (
    <div className='h-header flex px-10 fixed w-full top-0 bg-accent z-100'>
      <div className='ml-auto py-3'>
        <Image fill src={Avatar} className='cursor-pointer h-full rounded-full w-auto !relative' alt='...' />
      </div>
    </div>
  )
}

export default Header
