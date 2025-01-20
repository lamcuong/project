import { api } from '@expense-management/frontend/lib/client';
import { MutationConfig } from '@expense-management/frontend/lib/react-query';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { getAccountsQueryOptions } from './get-accounts';
import { Account, BaseResponse } from '@expense-management/shared';

export const deleteAccount = (accountId: string): Promise<BaseResponse<Account>> => {
  return api.delete(`/account/${accountId}`);
};

type UseDeleteAccountOptions = {
  mutationConfig: MutationConfig<typeof deleteAccount>;
};

export const useDeleteAccount = ({
  mutationConfig,
}: UseDeleteAccountOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...restConfig } = mutationConfig || {};
  return useMutation({
    mutationFn: deleteAccount,
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getAccountsQueryOptions().queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
  });
};
