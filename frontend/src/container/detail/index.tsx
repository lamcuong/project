'use client'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetDetailQuery } from '@/store/apis/accountApi'
import { useCreateExpenseMutation, useFetchExpenseQuery } from '@/store/apis/expenseApi'
import { handleFormatNumber } from '@/utils/format'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import List from './components/list'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFormDialog } from '@/hooks/Form'
import { useForm } from 'react-hook-form'
import { expenseForm } from '@/components/shared/forms'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/components/ui/use-toast'
import { MoveLeft, PlusIcon } from 'lucide-react'
import Link from 'next/link'
type AccountDetailProps = {}
const expenseTypeOptions = [
  {
    value: 'outcome',
    label: 'Chi tiền'
  },
  {
    value: 'income',
    label: 'Thu tiền'
  }
]
const outcomeOptions = [
  {
    value: 'Ăn uống',
    label: 'Ăn uống'
  },
  {
    value: 'Dịch vụ sinh hoạt',
    label: 'Dịch vụ sinh hoạt'
  },
  {
    value: 'Đi lại',
    label: 'Đi lại'
  },
  {
    value: 'Con cái',
    label: 'Con cái'
  },
  {
    value: 'Hiếu hỉ',
    label: 'Hiếu hỉ'
  },
  {
    value: 'Mua sắm',
    label: 'Mua sắm'
  },
  {
    value: 'Sức khoẻ',
    label: 'Sức khoẻ'
  },
  {
    value: 'Nhà cửa',
    label: 'Nhà cửa'
  },

  {
    value: 'Phát triển bản thân',
    label: 'Phát triển bản thân'
  },
  {
    value: 'Khác',
    label: 'Khác'
  }
]
const incomeOptions = [
  {
    value: 'Lương thưởng',
    label: 'Lương thưởng'
  },
  {
    value: 'Kinh doanh',
    label: 'Kinh doanh'
  },
  {
    value: 'Đầu tư',
    label: 'Đầu tư'
  },
  {
    value: 'Khác',
    label: 'Khác'
  }
]
const AccountDetail: React.FC<AccountDetailProps> = () => {
  const { toast } = useToast()
  const { id } = useParams()
  const [open, setOpen] = useState<boolean>(false)
  const { data: list, isFetching: isFetchingList } = useFetchExpenseQuery(id)
  const { data, isLoading, refetch } = useGetDetailQuery(id)
  const [overallType] = useState('all')
  const [create] = useCreateExpenseMutation()
  const form = useForm<z.infer<typeof expenseForm>>({
    resolver: zodResolver(expenseForm),
    defaultValues: {
      transaction: {
        amount: '',
        description: ''
      },
      category: 'Ăn uống',
      type: 'outcome'
    }
  })
  const onCreateExpense = async (value: z.infer<typeof expenseForm>) => {
    const data = await create({ ...value, account_id: id }).unwrap()
    toast({
      // @ts-ignore
      title: (
        <div>
          <p>Thêm giao dịch mới thành công</p>
          <Separator className='bg-neutral-200 my-3 w-full' />
        </div>
      ),
      description: (
        <div>
          <p>Hạng mục: {data.category}</p>
          <p className='mt-2'>
            {data.type === 'income' ? 'Thu tiền' : 'Chi tiền'}: {handleFormatNumber(data.transaction?.amount!)} VND
          </p>
        </div>
      )
    })
    refetch()
    setOpen(false)
    form.reset({})
  }
  // useEffect(() => {
  //   let placeholder = ''
  //   switch (form.getValues().category) {
  //     case 'Ăn uống':
  //       placeholder = 'Ví dụ: Tiền ăn trưa, ăn tối, đi cf, ....'
  //       break
  //     case 'Dịch vụ sinh hoạt':
  //       placeholder = 'Ví dụ: Tiền điện, tiền điện thoại, tiền internet, ....'
  //       break
  //     case 'Đi lại':
  //       placeholder = 'Ví dụ: Xăng xe, gửi xe, taxi, ....'
  //       break
  //     case 'Con cái':
  //       placeholder = 'Ví dụ: Tiền học của "..", tiền tiêu vặt, mua đồ chơi, ....'
  //       break
  //     case 'Hiếu hỉ':
  //       placeholder = 'Ví dụ: Đám cưới của " .... ", thăm hỏi, biếu tặng, ....'
  //       break
  //     case 'Mua sắm':
  //       placeholder = 'Ví dụ: Mua quần áo, mua điện thoại, ....'
  //       break
  //     case 'Sức khoẻ':
  //       placeholder = 'Ví dụ: Tiền khám bệnh, tiền thuốc, thể thao, ....'
  //       break
  //     case 'Nhà cửa':
  //       placeholder = 'Ví dụ: Tiền thuê nhà, mua đồ dùng, sửa nhà, ....'
  //       break
  //     case 'Hưởng thụ':
  //       placeholder = 'Ví dụ: Đi spa, du lịch, làm đẹp, ....'
  //       break
  //     case 'Phát triển bản thân':
  //       placeholder = 'Ví dụ: Tiền học khoá "...", mua đồ, ....'
  //       break
  //     // -------- Income --------
  //     case 'Lương thưởng':
  //       placeholder = 'Ví dụ: Tiền làm thêm, thưởng tết, ....'
  //       break
  //     case 'Kinh doanh':
  //       placeholder = 'Ví dụ: Bán hàng online, ....'
  //       break
  //     case 'Đầu tư':
  //       placeholder = 'Ví dụ: Cổ phiếu, Bitcoin, ....'
  //       break
  //   }
  //   // setPlaceholer(placeholder)
  //   form.setValue('placeholder', placeholder, {
  //     shouldTouch: true
  //   })
  // }, [form])
  const { render: renderForm } = useFormDialog({
    fields: [
      {
        name: 'type',
        type: 'select',
        label: 'Loại giao dịch',
        selectProps: {
          options: expenseTypeOptions
        }
      },
      {
        name: 'category',
        type: 'select',
        label: 'Hạng mục',
        selectProps: {
          options: form.getValues().type === 'outcome' ? outcomeOptions : incomeOptions
        }
      },
      {
        name: 'transaction.description',
        type: 'text',
        label: 'Chi tiết'
      },
      {
        name: 'transaction.date',
        type: 'date',
        label: 'Thời gian'
      },
      {
        name: 'transaction.amount',
        type: 'number',
        label: 'Số tiền'
      }
    ],
    form,
    onSubmit: onCreateExpense,
    title: 'Tạo giao dịch',
    open,
    setOpen
  })

  useEffect(() => {
    const options = form.getValues().type === 'outcome' ? outcomeOptions : incomeOptions
    if (!options.some((option) => option.value === form.getValues().category)) {
      form.setValue('category', options[0].value, {
        shouldTouch: true
      })
    }
  }, [form.getValues()]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {renderForm()}
      <div className='bg-white overflow-y-auto h-sidebar py-5 w-full'>
        <div className='min-h-full h-auto max-w-[85%] mx-auto '>
          <div className='flex items-center gap-4 w-fit '>
            <Link href={'/account'}>
              <MoveLeft />
            </Link>
            <p className='hidden lg:block'>Danh sách tài khoản</p>
          </div>
          <h1 className='text-center text-lg font-semibold'>Chi tiết tài khoản</h1>
          <div>
            {isLoading ? (
              <div className='mt-5 w-full'>
                <Skeleton className='h-10' times={1} gap={0} />
                <div className='mt-5'>
                  <Skeleton className='h-5' times={5} gap={5} />
                </div>
              </div>
            ) : (
              <>
                <div className='mt-5 flex justify-between gap-4 '>
                  <div className='flex-1 break-all hidden sm:block'>
                    <p className='text-md font-[500] mb-1'> Tài khoản:</p>
                    <p className='text-sm'>{data?.data.name}</p>
                  </div>
                  <div className='flex-1'>
                    <p className='text-md font-[500] mb-1'> Số dư ban đầu:</p>
                    <p className='text-sm'>{handleFormatNumber(data?.data.initialBalance)} VND</p>
                  </div>
                  <div className='flex-1'>
                    <p className='text-md font-[500] mb-1'> Số dư hiện tại:</p>
                    <p className='text-sm'>{handleFormatNumber(data?.data.balance)} VND</p>
                  </div>
                </div>
                <Separator className='bg-neutral-300 my-3' />
                <div className='flex justify-between mb-3 items-center'>
                  <Button className='w-1/5 flex items-center justify-center gap-3' onClick={() => setOpen(true)}>
                    <PlusIcon />
                    <p className='hidden md:block'>Tạo giao dịch mới</p>
                  </Button>
                  {/* <div className="flex gap-10">
                    <Button isActive={overallType === 'all'} onClick={() => setOverallType('all')}>
                      Tất cả chi tiêu
                    </Button>

                    <Button isActive={overallType === 'month'} onClick={() => setOverallType('month')}>
                      Tổng hợp theo tháng
                    </Button>
                  </div> */}
                  <Input placeholder='Tìm kiếm khoản chi tiêu theo ngày' className='w-1/3 xl:w-1/5 ' />
                </div>
                <h2 className='text-left font-[600] text-lg'>Lịch sử giao dịch</h2>
                <div className='mt-5'>
                  {list?.list.length! > 0 ? (
                    <List
                      overallType={overallType}
                      data={list?.list!}
                      paging={list?.paging}
                      isFetching={isFetchingList}
                    />
                  ) : (
                    <p className='text-3xl text-center mt-20'>Chưa có giao dịch nào</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountDetail
