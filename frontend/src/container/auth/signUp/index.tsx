'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShowPassword } from '../assets/eye'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import SuccessIcon from '../assets/success'
import ArrowDown from '../assets/ArrowDown'
import { signUpForm } from '@/components/shared/forms'
import { RotateCw } from 'lucide-react'
import { userApi } from '@/app/api/user'
import { useMutation } from '@tanstack/react-query'
import { UserInterface } from '@/types/user'
type SignUpProps = {}

const SignUp: React.FC<SignUpProps> = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isShow, setisShow] = useState({
    password: false,
    confirm_password: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof signUpForm>>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      username: '',
      password: '',
      confirm_password: ''
    }
  })
  const { mutate: signUp } = useMutation({
    mutationFn: (input: UserInterface) => userApi.signUp(input),
    onSuccess: () => {
      setIsOpen(true)
      form.reset()
    },
    onSettled: () => setIsLoading(false)
  })
  const onSubmit = async (value: z.infer<typeof signUpForm>) => {
    // form.reset();
    setIsLoading(true)
    const input = {
      username: value.username,
      password: value.password
    }
    signUp(input)
    // await userApi.signUp(input).then((r) => {
    //   if (r.success) {
    //     setIsOpen(true)
    //     form.reset()
    //   }
    // })
  }
  return (
    <>
      <Form {...form}>
        <h2 className='text-secondary-foreground text-2xl '>Đăng ký</h2>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5 w-full'>
          <FormField
            control={form.control}
            name='username'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tên đăng nhập</FormLabel>
                <FormControl>
                  <Input className='border-input' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mật khẩu</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input type={isShow.password ? 'text' : 'password'} className='border-input' {...field} />
                    <span
                      tabIndex={-1}
                      onClick={() => {
                        setisShow((isShow) => ({ ...isShow, password: !isShow.password }))
                      }}
                      className='vertical-center right-2 cursor-pointer'
                    >
                      {isShow.password ? <ShowPassword.show /> : <ShowPassword.hide />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='confirm_password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Xác nhận Mật khẩu</FormLabel>
                <FormControl>
                  <div className='relative'>
                    <Input type={isShow.confirm_password ? 'text' : 'password'} className='border-input' {...field} />
                    <span
                      onClick={() => {
                        setisShow((isShow) => ({ ...isShow, confirm_password: !isShow.confirm_password }))
                      }}
                      tabIndex={-1}
                      className='vertical-center right-2 cursor-pointer'
                    >
                      {isShow.confirm_password ? <ShowPassword.show /> : <ShowPassword.hide />}
                    </span>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type='submit' disabled={isLoading} variant='default' className=' mt-4 '>
            {isLoading ? <RotateCw className='animate-spin' /> : 'Đăng ký'}
          </Button>
          {/* <Separator className='bg-slate-100' />
          <Button
            type='button'
            onClick={() => {
              signIn('google', { callbackUrl: '/' })
            }}
            className='mx-auto flex justify-center items-center gap-3'
          >
            <GoogleIcon className='h-4 w-4' />
            Đăng nhập với Gmail
          </Button> */}
        </form>
      </Form>
      <Dialog open={isOpen}>
        <DialogContent
          onInteractOutside={() => {
            setIsOpen(false)
          }}
        >
          <DialogTitle className='mb-5'>
            <div className='aspect-square rounded-full w-fit bg-green-400 p-5 border border-gray-300 block mx-auto'>
              <SuccessIcon className=' rounded-full w-full h-full text-white' />
            </div>
          </DialogTitle>
          <DialogDescription className='flex flex-col justify-between items-center gap-3'>
            <p className='font-bold text-xl text-black mb-2'>Đăng ký tài khoản thành công!</p>
            <ArrowDown className='animate-bounce duration-300 repeat-infinite' />
            <Button
              type='button'
              onClick={() => {
                window.location.reload()
              }}
            >
              Về trang đăng nhap
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default SignUp
