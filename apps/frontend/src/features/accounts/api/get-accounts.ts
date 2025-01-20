import { api } from '@expense-management/frontend/lib/client';
import { QueryConfig } from '@expense-management/frontend/lib/react-query';
import {
  BaseParams,
  BaseListResponse,
  Account,
} from '@expense-management/shared';
import { queryOptions, useQuery } from '@tanstack/react-query';

export const getAccounts = ({
  meta = {
    page: 1,
    limit: 10,
  },
}: Partial<BaseParams>): Promise<BaseListResponse<Account>> => {
  return api.get('/account/list', {
    params: meta,
  });
};

export const getAccountsQueryOptions = ({
  meta = { page: 1, limit: 10 },
}: BaseParams = {}) => {
  return queryOptions({
    queryFn: () => getAccounts({ meta }),
    queryKey: ['accounts', { page: meta?.page, limit: meta?.limit }],
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
