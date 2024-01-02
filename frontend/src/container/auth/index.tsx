'use client'
import React, { useState } from 'react'
import SignIn from './signIn'
import SignUp from './signUp'
import { Card } from '@/components/ui/card'

type AuthPageProps = {}

const AuthPage: React.FC<AuthPageProps> = () => {
  const [page, setPage] = useState('signIn')
  return (
    <>
      <Card className='mx-auto w-[80%] sm:w-1/2 md:w-1/2 lg:w-1/3 max-w-[480px] flex flex-col items-center justify-center rounded-md p-10 pt-4 h-full'>
        {page === 'signIn' ? <SignIn /> : <SignUp />}
      </Card>
      <br />
      {page === 'signIn' ? (
        <p className='text-center text-sm'>
          Chưa có tài khoản?
          <span
            onClick={() => {
              setPage('signUp')
            }}
            className='cursor-pointer text-primary/90 pl-1'
          >
            Đăng ký ngay
          </span>
        </p>
      ) : (
        <p className='text-center text-sm'>
          Đã có tài khoản?
          <span
            onClick={() => {
              setPage('signIn')
            }}
            className='cursor-pointer text-primary/90 pl-1'
          >
            Đăng nhập
          </span>
        </p>
      )}
    </>
  )
}

export default AuthPage
