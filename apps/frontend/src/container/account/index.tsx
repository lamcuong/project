'use client'
import * as z from 'zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from '@expense-management/frontend/components/ui/table';
import Pagination from '@expense-management/frontend/components/ui/pagination';
import { Button } from '@expense-management/frontend/components/ui/button';
import { Separator } from '@expense-management/frontend/components/ui/separator';
import EmptyState from './components/emptyState'
import Link from 'next/link'
import { accountApi } from '@expense-management/frontend/app/api/account';
import {
  AccountInput,
  AccountInterface,
} from '@expense-management/frontend/types/account';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { accountKeys } from '@expense-management/frontend/utils/QueryKeyFactory';
import { refresh } from '@expense-management/frontend/utils/utils';
import { useConfirmDialog } from '@expense-management/frontend/hooks/ConfirmDialog';
import { accountForm } from '@expense-management/frontend/components/shared/forms';
import { useFormDialog } from '@expense-management/frontend/hooks/Form';
import { toast } from '@expense-management/frontend/components/ui/use-toast';
import { Skeleton } from '@expense-management/frontend/components/ui/skeleton';
type AccountProps = {}

const Account: React.FC<AccountProps> = () => {
  const queryClient = useQueryClient()
  const [searchTerm] = useState<string>('')
  const [paging, setPaging] = useState<any>({
    page: 1,
    limit: 10
  })
  const { data: accounts, isLoading } = useQuery({
    queryKey: accountKeys.list({ paging, searchTerm }),
    queryFn: () => accountApi.list({ limit: paging.limit, page: paging.page, search: searchTerm }),
    placeholderData: keepPreviousData
  })
  const onChangePage = async (page: string | number) => {
    setPaging((prevValue: any) => ({ ...prevValue, page }))
  }
  const onSizeChange = async (limit: string | number) => {
    setPaging((prevValue: any) => ({ ...prevValue, limit }))
  }

  const form = useForm<z.infer<typeof accountForm>>({
    resolver: zodResolver(accountForm),
    defaultValues: {
      initialBalance: 0,
      name: ''
    }
  })
  const fields: Field[] = [
    {
      name: 'name',
      type: 'text',
      label: 'Tài khoản chi tiêu',
      inputTextProps: { placeholder: 'Nhập tên tài khoản muốn tạo' }
    },
    {
      name: 'initialBalance',
      type: 'number',
      label: 'Số dư ban đầu',
      inputTextProps: { useGrouping: true }
    }
  ]
  const renderPagination = () => {
    return (
      <Pagination
        pageSize={paging.limit}
        onChangePage={onChangePage}
        count={accounts?.data?.paging.count}
        current_page={accounts?.data?.paging.current_page}
        onSizeChange={onSizeChange}
      />
    )
  }

  const { mutateAsync: createAccount } = useMutation({
    mutationFn: (value: AccountInput) => accountApi.create(value),
    onSuccess: async (account) => {
      await refresh(queryClient, [{ queryKey: accountKeys.all }])
      toast({
        //@ts-ignore
        title: (
          <div>
            <p>Thêm mới tài khoản thành công!</p>
            <Separator className='bg-neutral-200 my-3 w-full' />
          </div>
        ),
        description: (
          <div>
            <p>Tên tài khoản: {account.data.name}</p>
            <p className='mt-2'>
              Số dư ban đầu: {Number(account.data.initialBalance)?.toLocaleString().replace(/,/g, '.')} VND
            </p>
          </div>
        )
      })
    }
  })
  const confirmDialog = useConfirmDialog()
  const { mutateAsync: deleteAccount } = useMutation({
    mutationFn: (account: AccountInterface) => accountApi.remove(account.id),
    onSuccess: async (_, account) => {
      await refresh(queryClient, [{ queryKey: accountKeys.all }])
      toast({
        title: `Xoá thành công tài khoản ${account.name}`
      })
    }
  })
  const { render, create } = useFormDialog({
    form,
    fields,
    createItem: (item: AccountInput) => createAccount(item),
    title: 'Tạo tài khoản chi tiêu'
  })
  const handleDelete = (item: AccountInterface) => {
    confirmDialog(
      {
        description: `Hành động này sẽ xoá tài khoản ${item.name} hoàn toàn khỏi hệ thống và không thể hoàn tác`,
        title: `Chắc chắn muốn xoá tài khoản ${item.name} ?`
      },
      () => deleteAccount(item)
    )
  }
  return (
    <div>
      {render()}

      {isLoading ? (
        <div className='mt-10'>
          <Skeleton className='h-20' times={1} gap={0} />
          <div className='mt-10'>
            <Skeleton className='h-10' times={5} gap={5} />
          </div>
        </div>
      ) : accounts && accounts.data.list.length > 0 ? (
        <>
          <div className='flex justify-between items-center'>
            <h1 className='text-xl'>Quản lý chi tiêu</h1>
            {/* <Input
              placeholder='Tìm kiếm theo tên tài khoản hoặc số dư hiện tại ...'
              className='w-1/2'
              onChange={debounce((e) => {
                setSearchTerm(e.target.value)
              }, 500)}
            /> */}
            <Button onClick={() => create()}>Thêm tài khoản</Button>
          </div>
          <Table className='border mt-10 table-fixed '>
            <TableHeader>
              <TableRow>
                <TableHead className=' hidden md:table-cell md:w-[50px]'>STT</TableHead>
                <TableHead>Tên tài khoản</TableHead>
                <TableHead className='hidden md:table-cell'>Số dự ban đầu</TableHead>
                <TableHead className='hidden md:table-cell'>Số dư hiện tại</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className='break-words'>
              {accounts?.data?.list.map((item: AccountInterface, index: number) => (
                <TableRow key={item.id}>
                  <TableCell className='font-medium hidden md:table-cell'>{index + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className='hidden md:table-cell'>
                    <p className='tracking-[0.5px]'>
                      {Number(item.initialBalance)?.toLocaleString().replace(/,/g, '.')} VND
                    </p>
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    <p className='tracking-[0.5px]'>{Number(item.balance)?.toLocaleString().replace(/,/g, '.')} VND</p>
                  </TableCell>
                  <TableCell className='flex flex-col justify-center items-center xl:flex-row gap-2 p-3 sm:p-4 w-full sm:w-1/2 md:w-full 2xl:w-3/4 '>
                    <div className='w-full flex gap-3'>
                      <Link className='flex-1' href={`/account/${item.id}`}>
                        <Button className='w-full'>Chi tiết</Button>
                      </Link>
                      <Button
                        className='flex-1 !px-0'
                        variant={'destructive'}
                        type='button'
                        onClick={() => handleDelete(item)}
                      >
                        Xoá
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className='mt-10 flex gap-3 justify-end'>{renderPagination()}</div>
        </>
      ) : (
        <EmptyState create={create} />
      )}
    </div>
  )
}

export default Account
