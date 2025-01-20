import { api } from '@expense-management/frontend/lib/client';
import { MutationConfig } from '@expense-management/frontend/lib/react-query';
import { BaseResponse, Expense } from '@expense-management/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getExpensesQueryOptions } from './get-expenses';
import { getAccountQueryOption } from '../../accounts/api/get-account';

export const deleteExpense = ({
  accountId,
  expenseId,
}: {
  accountId: string;
  expenseId: string;
}): Promise<BaseResponse<Expense>> => {
  return api.delete(
    `/expense/delete/account/${accountId}/expense/${expenseId}`,
  );
};

type UseDeleteExpenseOptions = {
  accountId: string;
  mutationConfig: MutationConfig<typeof deleteExpense>;
};

export const useDeleteExpense = ({
  accountId,
  mutationConfig,
}: UseDeleteExpenseOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig;
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getExpensesQueryOptions(accountId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getAccountQueryOption(accountId).queryKey,
      });
      onSuccess?.(...args);
    },
    ...restConfig,
    mutationFn: deleteExpense,
  });
};
