import { api } from '@expense-management/frontend/lib/client';
import { MutationConfig } from '@expense-management/frontend/lib/react-query';
import { Expense, ExpenseType } from '@expense-management/shared';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { z } from 'zod';
import { getExpensesQueryOptions } from './get-expenses';
export const createExpenseInputSchema = z.object({
  type: z.nativeEnum(ExpenseType).default(ExpenseType.Outcome),
  transaction: z.object({
    description: z.string(),
    date: z.coerce.date().default(new Date()),
    amount: z.coerce.number().min(1, 'Số tiền không được để trống'),
  }),
  category: z.string().min(1, 'Hạng mục không được để trống'),
});

export type CreateExpenseInput = z.infer<typeof createExpenseInputSchema>;

export const createExpense = ({
  data,
  accountId,
}: {
  data: CreateExpenseInput;
  accountId: string;
}): Promise<BaseResponse<Expense>> => {
  return api.post(`/expense/${accountId}`, data);
};

type UseCreateExpenseOptions = {
  mutationConfig: MutationConfig<typeof createExpense>;
  accountId: string;
};

export const useCreateExpense = ({
  mutationConfig,
  accountId,
}: UseCreateExpenseOptions) => {
  const { onSuccess, ...restConfig } = mutationConfig || {};
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: (...args) => {
      queryClient.invalidateQueries({
        queryKey: getExpensesQueryOptions(accountId).queryKey,
      });
      onSuccess?.(...args);
    },
    mutationFn: createExpense,
    ...restConfig,
  });
};
