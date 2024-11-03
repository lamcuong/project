'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@expense-management/frontend/components/ui/form1';
import { Button } from '@expense-management/frontend/components/ui/button/button';
import { ShowPassword } from '../assets/eye';
// import { useSignInMutation } from '@expense-management/frontend/store/apis/authApi'
import { setCookie } from 'cookies-next';
import { RotateCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signInForm } from '@expense-management/frontend/components/shared/forms';
import { CardHeader } from '@expense-management/frontend/components/ui/card';
import { userApi } from '@expense-management/frontend/app/api/user/index';
import { useMutation } from '@tanstack/react-query';
import { UserInterface } from '@expense-management/frontend/types/user';
import { Input } from '@expense-management/frontend/components/ui/input';

type SignInProps = {};

const SignIn: React.FC<SignInProps> = () => {
  // const [logIn] = useSignInMutation()
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShow, setisShow] = useState<boolean>(false);
  const route = useRouter();
  const form = useForm<z.infer<typeof signInForm>>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      password: '',
      username: '',
    },
  });
  const { mutate: signIn } = useMutation({
    mutationFn: (input: UserInterface) => userApi.signIn(input),
    onSuccess: (data) => {
      setCookie('Authorization', data.data?.token);
    },
    onError: () => {
      setIsLoading(false);
    },
  });
  const onSubmit = (value: z.infer<typeof signInForm>) => {
    setIsLoading(true);
    signIn(value, {
      onSuccess: () => route.push('/'),
    });
  };
  return (
    <Form {...form}>
      <CardHeader className="text-secondary-foreground text-2xl ">
        Đăng nhập
      </CardHeader>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full "
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Tên đăng nhập</FormLabel>
                <FormControl>
                  <Input className="border-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mật khẩu</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    type={isShow ? 'text' : 'password'}
                    className="border-input"
                    {...field}
                  />
                  <span
                    onClick={() => {
                      setisShow(!isShow);
                    }}
                    tabIndex={-1}
                    className="vertical-center right-2 cursor-pointer"
                  >
                    {isShow ? <ShowPassword.show /> : <ShowPassword.hide />}
                  </span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button disabled={isLoading} variant="default" className=" mt-4 ">
          {isLoading ? <RotateCw className="animate-spin mr-2" /> : 'Đăng nhập'}
        </Button>
        {/* <p className='text-center'>
          Chưa có tài khoản?
          <span
            onClick={() => {
              setPage('signUp')
            }}
            className='text-secondary-foreground cursor-pointer underline pl-1'
          >
            Đăng ký tại đây
          </span>
        </p> */}
        {/* <Separator className='bg-slate-100' />

        <Button
          type='button'
          onClick={() => {
            setIsLoading(true)
            signIn('google', { callbackUrl: '/' }).then(() => {
              setTimeout(() => {
                setIsLoading(false)
              }, 600)
            })
          }}
          className='mx-auto flex justify-center items-center gap-3 min-w-[80%] '
        >
          {isLoading ? (
            <RotateCw className='animate-spin' />
          ) : (
            <>
              <GoogleIcon className='h-4 w-4' />

              <p>Đăng nhập với Gmail</p>
            </>
          )}
        </Button> */}
      </form>
    </Form>
  );
};

export default SignIn
