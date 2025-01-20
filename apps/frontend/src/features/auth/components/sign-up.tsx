import { Button } from '@expense-management/frontend/components/ui/button/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@expense-management/frontend/components/ui/dialog/dialog';
import {
  Form,
  InputForm,
} from '@expense-management/frontend/components/ui/form';
import { Input } from '@expense-management/frontend/components/ui/input';
import {
  signUpInputSchema,
  useSignUp,
} from '@expense-management/frontend/lib/auth';

import { useState } from 'react';
import { ShowPassword } from '../assets/eye';
import SuccessIcon from '../assets/success';
import ArrowDown from '../assets/ArrowDown';
import { RotateCw } from 'lucide-react';

const SignUp = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isShow, setisShow] = useState({
    password: false,
    confirm_password: false,
  });
  const signUp = useSignUp({
    onSuccess: () => {
      setIsOpen(true);
    },
  });
  return (
    <>
      <Form
        schema={signUpInputSchema}
        onSubmit={(values) => signUp.mutate(values)}
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
                customRender={(field) => {
                  return (
                    <div className="relative">
                      <Input
                        type={isShow.password ? 'text' : 'password'}
                        className="border-input"
                        {...field}
                      />
                      <span
                        onClick={() =>
                          setisShow((prev) => ({
                            ...prev,
                            password: !isShow.password,
                          }))
                        }
                        tabIndex={-1}
                        className="vertical-center right-2 cursor-pointer"
                      >
                        {isShow.password ? (
                          <ShowPassword.show />
                        ) : (
                          <ShowPassword.hide />
                        )}
                      </span>
                    </div>
                  );
                }}
              />
              <InputForm
                label="Xác nhận mật khẩu"
                control={control}
                name="confirm_password"
                error={formState.errors['confirm_password']}
                customRender={(field) => {
                  return (
                    <div className="relative">
                      <Input
                        type={isShow.confirm_password ? 'text' : 'password'}
                        className="border-input"
                        {...field}
                      />
                      <span
                        onClick={() =>
                          setisShow((prev) => ({
                            ...prev,
                            password: !isShow.confirm_password,
                          }))
                        }
                        tabIndex={-1}
                        className="vertical-center right-2 cursor-pointer"
                      >
                        {isShow.confirm_password ? (
                          <ShowPassword.show />
                        ) : (
                          <ShowPassword.hide />
                        )}
                      </span>
                    </div>
                  );
                }}
              />
              <Button
                type="submit"
                disabled={signUp.isPending}
                variant="default"
                className=" mt-4 w-full "
              >
                {signUp.isPending ? (
                  <RotateCw className="animate-spin" />
                ) : (
                  'Đăng ký'
                )}
              </Button>
            </>
          );
        }}
      </Form>
      <Dialog open={isOpen}>
        <DialogContent
          onInteractOutside={() => {
            setIsOpen(false);
          }}
        >
          <DialogTitle className="mb-5">
            <div className="aspect-square rounded-full w-fit bg-green-400 p-5 border border-gray-300 block mx-auto">
              <SuccessIcon className=" rounded-full w-full h-full text-white" />
            </div>
          </DialogTitle>
          <DialogDescription className="flex flex-col justify-between items-center gap-3">
            <p className="font-bold text-xl text-black mb-2">
              Đăng ký tài khoản thành công!
            </p>
            <ArrowDown className="animate-bounce duration-300 repeat-infinite" />
            <Button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
            >
              Về trang đăng nhập
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SignUp;
