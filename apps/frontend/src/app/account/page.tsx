import Account from '@frontend/container/account'
import MainLayout from '@frontend/layouts'
import React from 'react'

type AccountsProps = {}

const Accounts: React.FC<AccountsProps> = () => {
  return (
    <MainLayout>
      <Account />
    </MainLayout>
  )
}

export default Accounts
