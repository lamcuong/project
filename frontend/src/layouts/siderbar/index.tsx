'use client'
import React from 'react'
import Avatar from '../assets/Avatar.jpg'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { List, LogOut } from 'lucide-react'
import { deleteCookie } from 'cookies-next'

type SideBarProps = {}

const SideBar: React.FC<SideBarProps> = () => {
  const router = useRouter()

  return (
    <div className='sidebar h-full w-[var(--sidebar-width)] left-0 duration-300 flex flex-col'>
      <div className='flex justify-center gap-5 py-8 bg-muted '>
        <div>
          <Image src={Avatar} alt='...' className='rounded-lg sidebar-avatar' />
        </div>
      </div>

      <div className='mt-7 p-5 h-full'>
        <nav className='flex flex-col justify-between h-full'>
          <ul className=''>
            <li>
              <div
                onClick={() => {
                  router.push('/account')
                }}
                className={
                  ' cursor-pointer hover:text-primary-foreground flex hover:bg-primary rounded-lg gap-3 items-center'
                }
              >
                <div className=' p-2'>
                  <List size={20} />
                </div>
                <span className='sidebar-title overflow-hidden w-0 text-nowrap text-sm'>Danh sách tài khoản</span>
              </div>
            </li>
          </ul>
          <ul>
            <li>
              <div
                onClick={() => {
                  deleteCookie('Authorization')
                  router.push('/')
                }}
                className={
                  'hover:text-primary-foreground flex hover:bg-primary rounded-lg gap-3 items-center cursor-pointer '
                }
              >
                <div className=' p-2'>
                  <LogOut size={20} />
                </div>
                <span className='sidebar-title overflow-hidden w-0 text-nowrap text-sm'>Đăng xuất</span>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default SideBar
