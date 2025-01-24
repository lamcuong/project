'use client';
import {
  Card,
  CardHeader,
} from '@expense-management/frontend/components/ui/card';
import SignIn from '@expense-management/frontend/features/auth/components/sign-in';
import SignUp from '@expense-management/frontend/features/auth/components/sign-up';
import React, { useState } from 'react';

type AuthProps = {};

const Auth: React.FC<AuthProps> = () => {
  const [isLoginPage, setIsLoginPage] = useState<boolean>(true);
  const title = isLoginPage ? 'Đăng nhập' : 'Đăng ký';
  return (
    <div className="bg-muted min-h-screen py-24">
      <Card className="mx-auto w-[80%] sm:w-1/2 md:w-1/2 lg:w-1/3 max-w-[480px] flex flex-col items-center justify-center rounded-md p-10 pt-4 h-full mb-4">
        <CardHeader className="text-secondary-foreground text-2xl text-center">
          {title}
        </CardHeader>
        {isLoginPage ? <SignIn /> : <SignUp />}
      </Card>
      {isLoginPage ? (
        <p className="text-center text-sm">
          Chưa có tài khoản?
          <span
            onClick={() => {
              setIsLoginPage(false);
            }}
            className="cursor-pointer text-primary/90 pl-1"
          >
            Đăng ký ngay
          </span>
        </p>
      ) : (
        <p className="text-center text-sm">
          Đã có tài khoản?
          <span
            onClick={() => {
              setIsLoginPage(true);
            }}
            className="cursor-pointer text-primary/90 pl-1"
          >
            Đăng nhập
          </span>
        </p>
      )}
    </div>
  );
};

export default Auth;
