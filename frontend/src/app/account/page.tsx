import Account from '@/container/account'
import MainLayout from '@/layouts'
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
