'use client'

import { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<AccountInterface>[] = [
  {
    accessorKey: 'index',
    header: 'STT',
    cell: ({ row }) => {
      return row.index + 1
    }
  },
  {
    accessorKey: 'name',
    header: 'Tên tài khoản'
  },
  {
    accessorKey: 'initialBalance',
    header: 'Số dư ban đầu',
    cell: ({ row }) => {
      const amount = row.getValue('initialBalance')
      return <p className='tracking-[0.5px]'>{Number(amount)?.toLocaleString().replace(/,/g, '.')} VND</p>
    }
  },
  {
    accessorKey: 'balance',
    header: 'Số dư hiện tại',
    cell: ({ row }) => {
      const amount = row.getValue('balance')
      return <p className='tracking-[0.5px]'>{Number(amount)?.toLocaleString().replace(/,/g, '.')} VND</p>
    }
  }
]
