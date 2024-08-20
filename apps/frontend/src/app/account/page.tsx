import Account from '@expense-management/frontend/container/account';
import MainLayout from '@expense-management/frontend/layouts';
import React from 'react';

type AccountsProps = {};

const Accounts: React.FC<AccountsProps> = () => {
  return (
    <MainLayout>
      <Account />
    </MainLayout>
  );
};

export default Accounts;
