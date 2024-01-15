import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { ChevronDown } from 'lucide-react'
import React, { useCallback, useMemo, useState } from 'react'
import '../../../../styles/collapsible.css'
import { handleFormatNumber } from '@/utils/format'
import { Separator } from '@/components/ui/separator'
import _ from 'lodash'
import { cn } from '@/lib/utils'
import moment from 'moment'
import { usePathname, useRouter } from 'next/navigation'
import { ExpenseInterface } from '@/types/expense'
type ItemProps = {
  date: string
  groupedList: any
  index?: number
  groupedByDate: Record<string, ExpenseInterface[]>
  month?: string | number
  overallType: string
  overallList: any
}

const Item: React.FC<ItemProps> = ({ date, groupedList, index, groupedByDate }) => {
  const [isOpen, setIsOpen] = useState<boolean>(index === 0)
  const path = usePathname()
  const router = useRouter()

  const pushRoute = useCallback(
    (month: string) => {
      router.push(
        `${path}?${new URLSearchParams({
          month
        })}`
      )
    },
    [path, router]
  )
  const totalAmount = useMemo(() => {
    return groupedByDate[date].reduce((currentAmount: number, item: ExpenseInterface) => {
      const amount = item.type === 'income' ? item.transaction?.amount : -item.transaction?.amount!
      return currentAmount + amount!
    }, 0)
  }, [date, groupedByDate])
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className=''>
      <div className=' flex items-center justify-between'>
        <CollapsibleTrigger asChild>
          <div
            role='presentation'
            onClick={() => pushRoute((moment(date, '[Ngày] DD [Tháng] MM [Năm] YYYY').month() + 1).toString())}
            className=' bg-slate-200 w-full cursor-pointer p-2 flex justify-between items-center gap-2'
          >
            <h4 className=' hidden md:block font-[500] text-md flex-1'>{date}</h4>
            <h4 className=' block md:hidden font-[500] text-md flex-1'>
              {moment(date, '[Ngày] DD [Tháng] MM [Năm] YYYY').format('DD/MM/YYYY')}
            </h4>
            <div className='flex items-center gap-5 flex-1 justify-end whitespace-nowrap'>
              <p
                className={cn('text-green-500 font-[500] text-lg text-right ', {
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
        <div className='md:max-w-[90%] mx-auto my-3 break-words'>
          {Object.keys(groupedList[date]).map((category, index, array) => {
            const categoryAmount = groupedList[date][category].reduce(
              (initialValue: number, item: ExpenseInterface) => {
                const amount = item.type === 'income' ? item.transaction?.amount : -item.transaction?.amount!
                return initialValue + Number(amount)
              },
              0
            )
            return (
              <div key={index}>
                <div className='bg-neutral-200 p-2 font-[400] text-lg flex justify-between items-center '>
                  <div className='flex gap-2'>
                    <p>•</p>
                    <p>{category}</p>
                  </div>
                  <p className={cn('px-0 text-green-500 font-[400] text-lg', { 'text-red-400': categoryAmount! < 0 })}>
                    {handleFormatNumber(categoryAmount)} <span className='hidden md:inline'> VND</span>
                  </p>
                </div>

                {groupedList[date][category].map((item: ExpenseInterface, index: number, array: any) => {
                  const amount = item.type === 'income' ? item.transaction?.amount : -item.transaction?.amount!
                  return (
                    <div className='pl-5 pr-2 my-2' key={item.id}>
                      <div className='flex justify-between'>
                        <p className='font-[400] text-md flex-1 text-left overflow-hidden'>
                          {item.transaction?.description}
                        </p>
                        <p
                          className={cn('text-green-500 font-[400] text-md text-right flex-1 ', {
                            'text-red-400': amount! < 0
                          })}
                        >
                          {handleFormatNumber(amount!)} <span className='hidden md:inline'> VND</span>
                        </p>
                      </div>

                      {index !== array.length - 1 && <Separator className='my-2 bg-slate-500' />}
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
  )
}

export default Item
