'use client';
import { Skeleton } from '@expense-management/frontend/components/ui/skeleton';
import { MoveLeft } from 'lucide-react';
import Link from 'next/link';
import { useAccount } from '../api/get-account';
import { useParams } from 'next/navigation';
import { formatMoney } from '@expense-management/frontend/utils/format';

const AccountDetail = () => {
  const { id } = useParams();

  const accountQuery = useAccount({ accountId: id as string });
  const account = accountQuery.data?.data;
  if (accountQuery.isLoading) {
    return <Skeleton className="my-5 h-10" times={1} gap={2} />;
  }
  if (!account) return null;
  return (
    <>
      <div className="flex items-center gap-4 w-fit ">
        <Link href={'/account'}>
          <MoveLeft />
        </Link>
        <p className="hidden lg:block">Danh sách tài khoản</p>
      </div>
      <h1 className="text-center text-lg font-semibold">Chi tiết tài khoản</h1>

      <div>
        <div className="mt-5 flex justify-between gap-4 ">
          <div className="flex-1 break-all hidden sm:block">
            <p className="text-md font-[500] mb-1"> Tài khoản:</p>
            <p className="text-sm">{account.name}</p>
          </div>
          <div className="flex-1">
            <p className="text-md font-[500] mb-1"> Số dư ban đầu:</p>
            <p className="text-sm">{formatMoney(account.initialBalance)} VND</p>
          </div>
          <div className="flex-1">
            <p className="text-md font-[500] mb-1"> Số dư hiện tại:</p>
            <p className="text-sm">{formatMoney(account.balance)} VND</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetail;
