import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown, Pencil, Trash } from 'lucide-react'
import React, { useMemo, useState } from 'react'
import '../../../../styles/collapsible.css'
import { handleFormatNumber } from '@/utils/format'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import moment from 'moment'
import { useParams } from 'next/navigation'
import { ExpenseInput, ExpenseInterface } from '@/types/expense'
import { Button } from '@/components/ui/button'
import { useMutation } from '@tanstack/react-query'
import { expenseApi } from '@/app/api/expense'
import { toast } from '@/components/ui/use-toast'
import { refresh } from '@/utils/utils'
import { useQueryClient } from '@tanstack/react-query'
import { accountKeys, expenseKeys } from '@/utils/QueryKeyFactory'
import { useConfirmDialog } from '@/hooks/ConfirmDialog'
type ItemProps = {
  date: string
  groupedList: any
  index?: number
  groupedByDate: Record<string, ExpenseInterface[]>
  update: any
}

const Item: React.FC<ItemProps> = ({ date, groupedList, index, groupedByDate, update }) => {
  const [isOpen, setIsOpen] = useState<boolean>(index === 0)
  const { id } = useParams()
  const queryClient = useQueryClient()
  const totalAmount = useMemo(() => {
    return groupedByDate[date].reduce((currentAmount: number, item: ExpenseInterface) => {
      const amount = item.type === 'income' ? item.transaction?.amount : -item.transaction?.amount
      return currentAmount + amount!
    }, 0)
  }, [date, groupedByDate])
  const { mutateAsync: deleteExpense } = useMutation({
    mutationFn: (params: { account_id: string; expense_id: string }) =>
      expenseApi.remove(params.account_id, params.expense_id),
    onSuccess: async () => {
      await refresh(queryClient, [{ queryKey: expenseKeys.all }, { queryKey: accountKeys.detail(id as string) }])
      toast({
        title: 'Xoá thành công'
      })
    }
  })
  const confirmDialog = useConfirmDialog()
  const handleDelete = (item: ExpenseInput) => {
    if (item) {
      confirmDialog(
        {
          title: `Chắc chắn muốn xoá khoản ${item.transaction?.description} ?`,
          description: `Hành động này sẽ xoá khoản ${item.transaction?.description} hoàn toàn khỏi hệ thống và không thể hoàn tác`
        },
        () => deleteExpense({ account_id: id as string, expense_id: item.id! })
      )
    }
  }
  return (
    <>
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className=''>
        <div className=' flex items-center justify-between'>
          <CollapsibleTrigger asChild>
            <div
              role='presentation'
              className=' bg-slate-200 w-full cursor-pointer p-2 flex justify-between items-center gap-2'
            >
              <h4 className=' hidden md:block font-[500] text-md flex-1'>{date}</h4>
              <h4 className=' block md:hidden font-[500] text-md flex-1'>
                {moment(date, '[Ngày] DD [Tháng] MM [Năm] YYYY').format('DD/MM/YYYY')}
              </h4>
              <div className='flex items-center gap-5 flex-1 justify-end whitespace-nowrap'>
                <p
                  className={cn('text-green-500 font-[500] text-md text-right ', {
                    'text-red-400': totalAmount < 0
                  })}
                >
                  {handleFormatNumber(totalAmount)} <span className='hidden md:inline'> VND</span>
                </p>
                <ChevronDown className={cn('transition-all duration-300  ', { 'rotate-180 ': isOpen })} />
              </div>
            </div>
          </CollapsibleTrigger>
        </div>
        <Separator className='bg-neutral-200 w-full' />
        <CollapsibleContent className=' bg-neutral-100 space-y-1 CollapsibleContent'>
          <div className=' my-3 break-words'>
            {Object.keys(groupedList[date]).map((category, index, array) => {
              const categoryAmount = groupedList[date][category].reduce(
                (initialValue: number, item: ExpenseInterface) => {
                  const amount = item.type === 'income' ? item.transaction?.amount : -item.transaction?.amount
                  return initialValue + Number(amount)
                },
                0
              )
              return (
                <div key={index}>
                  <div className='md:max-w-[90%] bg-neutral-200 p-2 font-[400] text-md flex justify-between items-center '>
                    <div className='flex gap-2'>
                      <p>•</p>
                      <p>{category}</p>
                    </div>
                    <p
                      className={cn('px-0 text-green-500 font-[400] text-md', { 'text-red-400': categoryAmount! < 0 })}
                    >
                      {handleFormatNumber(categoryAmount)} <span className='hidden md:inline'> VND</span>
                    </p>
                  </div>

                  {groupedList[date][category].map((item: ExpenseInterface, index: number, array: any) => {
                    const amount = item.type === 'income' ? item.transaction?.amount : -item?.transaction?.amount
                    return (
                      <div className='pl-5 md:pr-2 my-2' key={item.id}>
                        <div className='flex items-center md:items-baseline'>
                          <div className='w-full max-w-[90%] flex overflow-hidden mr-2 md:mr-0'>
                            <p className='hidden md:block font-[400] text-md flex-1 text-left overflow-hidden'>
                              {item.transaction?.description}
                            </p>
                            <div
                              onClick={() => update(item)}
                              className='md:hidden font-[400] text-md flex-1 text-left overflow-hidden underline text-nowrap text-ellipsis'
                            >
                              <p>{item.transaction?.description}</p>
                            </div>
                            <p
                              className={cn(
                                'text-green-500 font-[400] text-md text-right flex-1 md:min-w-[20%] md:flex-auto ',
                                {
                                  'text-red-400': amount! < 0
                                }
                              )}
                            >
                              {handleFormatNumber(amount)} <span className='hidden md:inline'> VND</span>
                            </p>
                          </div>
                          <div className='flex flex-1 justify-center gap-1 md:gap-3 '>
                            <Button type='button' onClick={() => update(item)} variant='default'>
                              <Pencil size={14} />
                            </Button>
                            <Button className='' onClick={() => handleDelete(item)} variant='destructive'>
                              <Trash size={14} />
                            </Button>
                          </div>
                        </div>
                        {index !== array.length - 1 && <Separator className='my-2 bg-slate-500 flex-1' />}
                      </div>
                    )
                  })}
                  {index !== array.length - 1 && <Separator className='my-2 bg-slate-500' />}
                </div>
              )
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  )
}

export default Item
