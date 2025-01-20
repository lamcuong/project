import { api } from '@expense-management/frontend/lib/client';
import { QueryConfig } from '@expense-management/frontend/lib/react-query';
import { Expense } from '@expense-management/shared';
import { queryOptions, useQuery } from '@tanstack/react-query';
import { BaseListResponse } from '@expense-management/shared';
export const getExpenses = (
  accountId: string,
): Promise<BaseListResponse<Expense>> => {
  return api.get(`/expense/list/${accountId}`);
};

export const getExpensesQueryOptions = (accountId: string) => {
  return queryOptions({
    queryFn: () => getExpenses(accountId),
    queryKey: ['expenses', { accountId }],
  });
};

type UseExpensesOptions = {
  queryConfig?: QueryConfig<typeof getExpensesQueryOptions>;
  accountId: string;
};

export const useExpenses = ({ queryConfig, accountId }: UseExpensesOptions) => {
  return useQuery({
    ...getExpensesQueryOptions(accountId),
    ...queryConfig,
  });
};
