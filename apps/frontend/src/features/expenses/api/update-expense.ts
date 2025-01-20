import { api } from '@expense-management/frontend/lib/client';
import { MutationConfig } from '@expense-management/frontend/lib/react-query';
import { Expense, ExpenseType } from '@expense-management/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { getExpensesQueryOptions } from './get-expenses';
import { getAccountQueryOption } from '../../accounts/api/get-account';
export const updateExpenseInputSchema = z.object({
  id: z.string().optional(),
  type: z.nativeEnum(ExpenseType),
  transaction: z.object({
    description: z.string(),
    date: z.coerce.date().default(new Date()),
    amount: z.coerce.number().min(1, 'Số tiền không được để trống'),
  }),
  category: z.string().min(1, 'Hạmg mục không được để trống'),
});

export type UpdateExpenseInput = z.infer<typeof updateExpenseInputSchema>;

export const updateExpense = ({
  data,
  accountId,
}: {
  data: UpdateExpenseInput;
  accountId: string;
}): Promise<BaseResponse<Expense>> => {
  return api.put(`/expense/update/${accountId}`, data);
};
type UseUpdateExpenseOptions = {
  mutationConfig: MutationConfig<typeof updateExpense>;
  accountId: string;
};

export const useUpdateExpense = ({
  mutationConfig,
  accountId,
}: UseUpdateExpenseOptions) => {
  const queryClient = useQueryClient();
  const ttt = 22;
  const { onSuccess, ...restConfig } = mutationConfig;
  return useMutation({
    mutationFn: updateExpense,
    onSuccess: (data, ...args) => {
      onSuccess?.(data, ...args);
      queryClient.invalidateQueries({
        queryKey: getExpensesQueryOptions(accountId).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getAccountQueryOption(accountId).queryKey,
      });
    },
    ...restConfig,
  });
};
