import { User } from '@expense-management/shared';
import { api } from './client';
import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';
import { z } from 'zod';
import { setCookie } from 'cookies-next';
type LoginResponse = {
  user: User;
  token: string;
};
export const getUser = async () => {
  const response = await api.get<Promise<BaseResponse<User>>>('/user/me');

  return response.data;
};
const userQueryKey = ['user'];
export const getUserQueryOption = () => {
  return queryOptions({
    queryKey: userQueryKey,
    queryFn: getUser,
  });
};

export const useUser = () => useQuery(getUserQueryOption());
export const useLogin = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  return useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      setCookie('Authorization', data.data.token);

      onSuccess?.();
    },
  });
};
export const useSignUp = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
  return useMutation({
    mutationFn: signUp,
    onSuccess: () => {
      onSuccess?.();
    },
  });
};
export const loginInputSchema = z.object({
  username: z
    .string({ required_error: 'Tên đăng nhập không được để trống' })
    .regex(/^[^\s]*$/, 'Tên đăng nhập không được chứa khoảng trắng'),
  password: z
    .string({
      required_error: 'Mật khẩu không được để trống',
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=\S+$)/,
      'Mật khẩu bao gồm chữ hoa, chữ thường và số',
    )
    .min(6, 'Mật khẩu phải có ít nhất 6 kí tự'),
});
export type LoginInput = z.infer<typeof loginInputSchema>;
const signIn = async (input: LoginInput) => {
  return api.post<BaseResponse<LoginResponse>>(`/user/sign-in`, input);
};

export const signUpInputSchema = z
  .object({
    username: z
      .string({
        required_error: 'Tên đăng nhập không được để trống',
      })
      .min(1, 'Tên đăng nhập không được để trống')
      .regex(/^[^\s]*$/, 'Tên đăng nhập không được chứa khoảng trắng'),
    password: z
      .string({
        required_error: 'Mật khẩu không được để trống',
      })
      .min(1, 'Mật khẩu không được để trống')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=\S+$)/,
        'Mật khẩu bao gồm chữ hoa, chữ thường và số',
      )
      .min(6, 'Mật khẩu phải có ít nhất 6 kí tự'),
    confirm_password: z
      .string({
        required_error: 'Xác nhận mật khẩu không được để trống',
      })
      .min(1, 'Xác nhận mật khẩu không được để trống')
      .trim(),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ['confirm_password'],
    message: 'Mật khẩu không khớp',
  });
export type SignUpInput = z.infer<typeof signUpInputSchema>;

export const signUp = async (input: SignUpInput) => {
  return api.post<BaseResponse<User>>('/user/sign-up', input);
};
