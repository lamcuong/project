import { Table } from '@expense-management/frontend/components/ui/table/table';
import { formatMoney } from '@expense-management/frontend/utils/format';
import { useState } from 'react';
import { useAccounts } from '../api/get-accounts';
import { Skeleton } from '@expense-management/frontend/components/ui/skeleton';
import { Button } from '@expense-management/frontend/components/ui/button/button';
import Link from 'next/link';
import DeleteAccount from './delete-account';

const AccountList = () => {
  const [paging, setPaging] = useState({
    page: 1,
    limit: 10,
  });
  const accountQuery = useAccounts({
    params: {
      meta: {
        page: paging.page,
        limit: paging.limit,
      },
    },
  });
  const accounts = accountQuery.data?.data;
  if (accountQuery.isLoading) {
    return (
      <div className="mt-10">
        <Skeleton className="h-20" times={1} gap={0} />
        <div className="mt-10">
          <Skeleton className="h-10" times={5} gap={5} />
        </div>
      </div>
    );
  }

  if (!accounts) return null;
  return (
    <Table
      className="border mt-10 table-fixed"
      data={accounts.list.map((item, index) => ({
        ...item,
        itemNo: index + 1,
      }))}
      columns={[
        {
          title: 'STT',
          field: 'id',
          Cell: ({ entry }) => <span>{entry.itemNo}</span>,
          titleClassName: 'hidden md:table-cell md:w-[50px]',
          cellClassName: 'font-medium hidden md:table-cell',
        },
        {
          title: 'Tên tài khoản',
          field: 'name',
        },
        {
          title: 'Số dư ban đầu',
          field: 'initialBalance',
          Cell: ({ entry }) => {
            return (
              <p className="tracking-[0.5px]">
                {formatMoney(entry.initialBalance)} VND
              </p>
            );
          },
        },
        {
          title: '',
          field: 'id',
          Cell: ({ entry }) => {
            return (
              <div className="flex flex-col justify-center items-center xl:flex-row gap-2 p-3 sm:p-4 w-full sm:w-1/2 md:w-full 2xl:w-2/4 ">
                <div className="w-full flex gap-3">
                  <Link className="flex-1" href={`/account/${entry.id}`}>
                    <Button className="w-full">Chi tiết</Button>
                  </Link>
                  <DeleteAccount account={entry} />
                </div>
              </div>
            );
          },
        },
      ]}
    />
  );
};

export default AccountList;
