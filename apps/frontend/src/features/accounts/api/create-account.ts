import { api } from '@expense-management/frontend/lib/client';
import { MutationConfig } from '@expense-management/frontend/lib/react-query';
import { Account, BaseResponse } from '@expense-management/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { getAccountsQueryOptions } from './get-accounts';

export const createAccountInputSchema = z.object({
  name: z.string().min(1, 'Tên tài khoản không được để trống'),
  initialBalance: z.number({
    required_error: 'Số dư ban đầu không được để trống',
  }),
});

export type CreateAccountInput = z.infer<typeof createAccountInputSchema>;

export const createAccount = ({
  data,
}: {
  data: CreateAccountInput;
}): Promise<BaseResponse<Account>> => {
  return api.post('/account', data);
};

type UseCreateAccountOptions = {
  mutationConfig: MutationConfig<typeof createAccount>;
};

export const useCreateAccount = ({
  mutationConfig,
}: UseCreateAccountOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};

  return useMutation({
    mutationFn: createAccount,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAccountsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
