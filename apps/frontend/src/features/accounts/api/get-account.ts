import { api } from '@expense-management/frontend/lib/client';
import { QueryConfig } from '@expense-management/frontend/lib/react-query';
import { Account } from '@expense-management/shared';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getAccount = (
  accountId: string,
): Promise<BaseResponse<Account>> => {
  return api.get(`/account/detail/${accountId}`);
};

export const getAccountQueryOption = (accountId: string) => {
  return queryOptions({
    queryFn: () => getAccount(accountId),
    queryKey: ['account', { accountId }],
  });
};

type UseAccountOptions = {
  queryConfig?: QueryConfig<typeof getAccountQueryOption>;
  accountId: string;
};
export const useAccount = ({ accountId, queryConfig }: UseAccountOptions) => {
  return useQuery({
    ...getAccountQueryOption(accountId),
    ...queryConfig,
  });
};
