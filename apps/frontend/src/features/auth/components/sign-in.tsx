'use client';

import { Button } from '@expense-management/frontend/components/ui/button/button';
import {
  Form,
  InputForm,
} from '@expense-management/frontend/components/ui/form';
import { Input } from '@expense-management/frontend/components/ui/input';
import {
  loginInputSchema,
  useLogin,
} from '@expense-management/frontend/lib/auth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ShowPassword } from '../assets/eye';

const SignIn = () => {
  const [isShow, setIsShow] = useState<boolean>(false);
  const route = useRouter();
  const login = useLogin({
    onSuccess: () => {
      route.push('/');
    },
  });

  return (
    <Form
      schema={loginInputSchema}
      onSubmit={(values) => {
        login.mutate(values);
      }}
      className="w-full"
    >
      {({ control, formState }) => {
        return (
          <>
            <InputForm
              label="Tên đăng nhập"
              control={control}
              name="username"
              error={formState.errors['username']}
            />
            <InputForm
              label="Mật khẩu"
              control={control}
              name="password"
              error={formState.errors['password']}
              className="border-input"
              customRender={(field) => {
                return (
                  <div className="relative">
                    <Input
                      type={isShow ? 'text' : 'password'}
                      className="border-input"
                      {...field}
                    />
                    <span
                      onClick={() => setIsShow(!isShow)}
                      tabIndex={-1}
                      className="vertical-center right-2 cursor-pointer"
                    >
                      {isShow ? <ShowPassword.show /> : <ShowPassword.hide />}
                    </span>
                  </div>
                );
              }}
            />
            <div>
              <Button
                disabled={login.isPending}
                type="submit"
                className="w-full"
              >
                Đăng nhập
              </Button>
            </div>
          </>
        );
      }}
    </Form>
  );
};

export default SignIn;
