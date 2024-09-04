'use client'
import { Separator } from '@expense-management/frontend/components/ui/separator';
import { handleFormatNumber } from '@expense-management/frontend/utils/format';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import List from './components/list'
import { Button } from '@expense-management/frontend/components/ui/button';
import { useFormDialog } from '@expense-management/frontend/hooks/Form';
import { useForm } from 'react-hook-form'
import { expenseForm } from '@expense-management/frontend/components/shared/forms';
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@expense-management/frontend/components/ui/use-toast';
import { MoveLeft, PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { accountApi } from '@expense-management/frontend/app/api/account';
import { expenseApi } from '@expense-management/frontend/app/api/expense';
import { useMutation, useQuery } from '@tanstack/react-query'
import { ExpenseInput } from '@expense-management/frontend/types/expense';
import { useQueryClient } from '@tanstack/react-query'
import {
  accountKeys,
  expenseKeys,
} from '@expense-management/frontend/utils/QueryKeyFactory';
import { Skeleton } from '@expense-management/frontend/components/ui/skeleton';
import { refresh } from '@expense-management/frontend/utils/utils';
import { ExpenseType } from '@expense-management/shared';
type AccountDetailProps = {};
const expenseTypeOptions = [
  {
    value: ExpenseType.Outcome,
    label: 'Chi tiền',
  },
  {
    value: ExpenseType.Income,
    label: 'Thu tiền',
  },
];
const outcomeOptions = [
  {
    value: 'Ăn uống',
    label: 'Ăn uống',
  },
  {
    value: 'Dịch vụ sinh hoạt',
    label: 'Dịch vụ sinh hoạt',
  },
  {
    value: 'Đi lại',
    label: 'Đi lại',
  },
  {
    value: 'Con cái',
    label: 'Con cái',
  },
  {
    value: 'Hiếu hỉ',
    label: 'Hiếu hỉ',
  },
  {
    value: 'Mua sắm',
    label: 'Mua sắm',
  },
  {
    value: 'Sức khoẻ',
    label: 'Sức khoẻ',
  },
  {
    value: 'Nhà cửa',
    label: 'Nhà cửa',
  },

  {
    value: 'Phát triển bản thân',
    label: 'Phát triển bản thân',
  },
  {
    value: 'Khác',
    label: 'Khác',
  },
];
const incomeOptions = [
  {
    value: 'Lương thưởng',
    label: 'Lương thưởng',
  },
  {
    value: 'Kinh doanh',
    label: 'Kinh doanh',
  },
  {
    value: 'Đầu tư',
    label: 'Đầu tư',
  },
  {
    value: 'Khác',
    label: 'Khác',
  },
];
const AccountDetail: React.FC<AccountDetailProps> = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { id } = useParams();
  const { data: account, isLoading: accountLoading } = useQuery({
    queryKey: accountKeys.detail(id as string),
    queryFn: () => accountApi.detail(id as string),
  });

  const { data: expenses, isLoading: expenseLoading } = useQuery({
    queryKey: expenseKeys.list({ id }),
    queryFn: () => expenseApi.list(id as string),
  });
  const form = useForm<z.infer<typeof expenseForm>>({
    resolver: zodResolver(expenseForm),
    defaultValues: {
      transaction: {
        amount: 0,
        description: '',
      },
      category: 'Ăn uống',
      type: 'outcome',
    },
  });

  const { mutateAsync: createExpense } = useMutation({
    mutationFn: (input: ExpenseInput) => expenseApi.create(input),
    onSuccess: async (response) => {
      await refresh(queryClient, [
        { queryKey: expenseKeys.all },
        { queryKey: accountKeys.detail(id as string) },
      ]);
      toast({
        // @ts-ignore
        title: (
          <div>
            <p>Thêm giao dịch mới thành công</p>
            <Separator className="bg-neutral-200 my-3 w-full" />
          </div>
        ),
        description: (
          <div>
            <p>Hạng mục: {response.data.category}</p>
            <p className="mt-2">
              {response.data.type === ExpenseType.Income
                ? 'Thu tiền'
                : 'Chi tiền'}
              : {handleFormatNumber(response.data.transaction?.amount)} VND
            </p>
          </div>
        ),
      });
    },
  });
  const { mutateAsync: updateExpense } = useMutation({
    mutationFn: (input: ExpenseInput) => expenseApi.update(id as string, input),
    onSuccess: async () => {
      await refresh(queryClient, [
        { queryKey: expenseKeys.all },
        { queryKey: accountKeys.detail(id as string) },
      ]);
      toast({
        title: 'Cập nhật thành công',
      });
    },
  });

  const {
    render: renderForm,
    create,
    update,
  } = useFormDialog({
    fields: [
      {
        name: 'type',
        type: 'select',
        label: 'Loại giao dịch',
        selectProps: {
          options: expenseTypeOptions,
        },
      },
      {
        name: 'category',
        type: 'select',
        label: 'Hạng mục',
        selectProps: {
          options:
            form.getValues().type === 'outcome'
              ? outcomeOptions
              : incomeOptions,
        },
      },
      {
        name: 'transaction.description',
        type: 'text',
        label: 'Chi tiết',
      },
      {
        name: 'transaction.date',
        type: 'date',
        label: 'Thời gian',
      },
      {
        name: 'transaction.amount',
        type: 'number',
        label: 'Số tiền',
        inputTextProps: { useGrouping: true },
      },
    ],
    form,

    createItem: (item: ExpenseInput) =>
      createExpense({ ...item, account_id: id as string }),
    updateItem: (item: ExpenseInput) => updateExpense(item),
    title: 'Tạo giao dịch',
  });

  useEffect(() => {
    const options =
      form.getValues().type === 'outcome' ? outcomeOptions : incomeOptions;
    if (!options.some((option) => option.value === form.getValues().category)) {
      form.setValue('category', options[0].value, {
        shouldTouch: true,
      });
    }
  }, [form.getValues()]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {renderForm()}
      <div className="bg-white overflow-y-auto h-sidebar py-5 w-full">
        <div className="min-h-full h-auto max-w-[85%] mx-auto ">
          <div className="flex items-center gap-4 w-fit ">
            <Link href={'/account'}>
              <MoveLeft />
            </Link>
            <p className="hidden lg:block">Danh sách tài khoản</p>
          </div>
          <h1 className="text-center text-lg font-semibold">
            Chi tiết tài khoản
          </h1>
          {accountLoading ? (
            <Skeleton className="my-5 h-10" times={1} gap={2} />
          ) : (
            <div>
              <div className="mt-5 flex justify-between gap-4 ">
                <div className="flex-1 break-all hidden sm:block">
                  <p className="text-md font-[500] mb-1"> Tài khoản:</p>
                  <p className="text-sm">{account?.data?.name}</p>
                </div>
                <div className="flex-1">
                  <p className="text-md font-[500] mb-1"> Số dư ban đầu:</p>
                  <p className="text-sm">
                    {handleFormatNumber(account?.data?.initialBalance)} VND
                  </p>
                </div>
                <div className="flex-1">
                  <p className="text-md font-[500] mb-1"> Số dư hiện tại:</p>
                  <p className="text-sm">
                    {handleFormatNumber(account?.data?.balance)} VND
                  </p>
                </div>
              </div>
              <Separator className="bg-neutral-300 my-3" />
              <div className="flex justify-between mb-3 items-center">
                <Button
                  className="w-1/5 flex items-center justify-center gap-3"
                  onClick={() => create()}
                >
                  <PlusIcon />
                  <p className="hidden md:block">Tạo giao dịch mới</p>
                </Button>
                {/* <div className="flex gap-10">
                   <Button isActive={overallType === 'all'} onClick={() => setOverallType('all')}>
                     Tất cả chi tiêu
                   </Button>

                   <Button isActive={overallType === 'month'} onClick={() => setOverallType('month')}>
                     Tổng hợp theo tháng
                   </Button>
                 </div> */}
                {/* <Input placeholder='Tìm kiếm khoản chi tiêu theo ngày' className='w-1/3 xl:w-1/5 ' /> */}
              </div>
            </div>
          )}

          <div>
            <h2 className="text-left font-[600] text-lg">Lịch sử giao dịch</h2>
            {expenseLoading ? (
              <Skeleton className="mt-5 h-20" times={1} gap={5} />
            ) : (
              <div className="mt-5">
                {expenses && expenses.data?.list?.length > 0 ? (
                  <List update={update} data={expenses.data?.list} />
                ) : (
                  <p className="text-3xl text-center mt-20">
                    Chưa có giao dịch nào
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountDetail
