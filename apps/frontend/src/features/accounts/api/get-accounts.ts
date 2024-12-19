import { api } from '@expense-management/frontend/lib/client';
import { QueryConfig } from '@expense-management/frontend/lib/react-query';
import {
  BaseParams,
  BaseListResponse,
  Account,
} from '@expense-management/shared';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getAccounts = ({
  page = 1,
  limit,
}: Partial<BaseParams>): Promise<BaseListResponse<Account>> => {
  return api.get('/account/list', {
    params: {
      page,
      limit,
    },
  });
};

export const getAccountsQueryOptions = ({
  page = 1,
  limit = 10,
}: BaseParams = {}) => {
  return queryOptions({
    queryFn: () => getAccounts({ page, limit }),
    queryKey: ['accounts', { page, limit }],
  });
};

type UseAccountsOptions = {
  params: BaseParams;
  queryConfig?: QueryConfig<typeof getAccountsQueryOptions>;
};

export const useAccounts = ({ params, queryConfig }: UseAccountsOptions) => {
  return useQuery({
    ...getAccountsQueryOptions(params),
    ...queryConfig,
  });
};
