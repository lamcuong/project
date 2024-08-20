import React from 'react'
import EmptyIcon from '../assets/emptyIcon'
import { Button } from '@expense-management/frontend/components/ui/button';

type EmptyStateProps = {
  create: any
}

const EmptyState: React.FC<EmptyStateProps> = ({ create }) => {
  return (
    <div className='flex flex-col items-center gap-3 '>
      <div className='w-full h-auto lg:w-[70%]'>
        <EmptyIcon className='w-1/4 h-auto mx-auto ' />
      </div>
      <div className='text-center'>
        <p className='text-lg lg:text-xl mb-4'>Chưa có tài khoản chi tiêu</p>
        <p className='text-sm lg:text-lg'>Tạo ngay tài khoản để quản lý chi tiêu cho bản thân và gia đình tại đây</p>
      </div>
      <Button onClick={() => create()} className='w-1/2 lg:w-1/4 mt-4'>
        Tạo ngay
      </Button>
    </div>
  )
}

export default EmptyState
