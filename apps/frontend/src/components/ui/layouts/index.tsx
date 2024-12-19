import React from 'react'
import SideBar from './siderbar'

type MainLayoutProps = {
  children: React.ReactNode
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className='flex h-screen'>
      <div className='hidden lg:block bg-muted'>
        <SideBar />
      </div>
      <div className='lg:px-0 overflow-y-auto w-full'>
        <div className='h-full min-h-full p-10 w-full'>{children}</div>
      </div>
    </div>
  )
}

export default MainLayout
