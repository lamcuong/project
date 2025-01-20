'use client';
import MainLayout from '@expense-management/frontend/components/ui/layouts';
import CreateAccount from '@expense-management/frontend/features/accounts/components/create-account';
import AccountList from '@expense-management/frontend/features/accounts/components/account-list';

type AccountsProps = {};

const Accounts: React.FC<AccountsProps> = () => {
  return (
    <MainLayout>
      <>
        <div className="flex justify-between items-center">
          <h1 className="text-xl ">Quản lý chiergergre tiêu</h1>
          <div>
            <CreateAccount />
          </div>
        </div>
        <AccountList />
      </>
    </MainLayout>
  );
};

export default Accounts;
