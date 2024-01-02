'use client'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useFetchOverallListQuery } from '@/store/apis/expenseApi'
import _ from 'lodash'
import moment from 'moment'
import React, { useState } from 'react'
import { handleFormatNumber } from '@/utils/format'
import { cn } from '@/lib/utils'

type OverAllProps = {
  account_id: string
  isDialogOpen: boolean
  setIsDialogOpen: (open: boolean) => void
}

const OverAll: React.FC<OverAllProps> = ({ account_id, isDialogOpen, setIsDialogOpen }) => {
  const { data } = useFetchOverallListQuery({ account_id })

  const [overallType, setOverallType] = useState('month')
  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent className=' max-w-full !w-full md:!w-1/2 max-h-[70%]'>
        <DialogHeader>
          <DialogTitle className='text-center'>Tổng hợp chi tiêu</DialogTitle>
        </DialogHeader>
        <Separator className='bg-slate-400 w-1/2 mx-auto my-2' />
        <div className='flex justify-center gap-14 mt-2'>
          <Button
            onClick={() => {
              setOverallType('month')
            }}
            isActive={overallType === 'month'}
          >
            Tổng hợp tháng
          </Button>
          <Button
            onClick={() => {
              setOverallType('day')
            }}
            isActive={overallType === 'day'}
          >
            Tổng hợp ngày
          </Button>
        </div>
        <div>
          {data?.list?.map((item: any, index: number) => {
            const category = _.groupBy(item.transactions, 'category')
            const formattedDate = moment({
              day: item.date.day,
              month: item.date.month - 1,
              year: item.date.year
            }).format('[Ngày] DD [Tháng] MM [Năm] YYYY')
            return (
              <div key={index} className=' mb-3'>
                <div className='flex justify-between bg-neutral-300 p-3'>
                  <p>{formattedDate}</p>
                  <p>{item.totalAmount}</p>
                </div>
                <div className='flex flex-col py-3 bg-stone-200'>
                  {Object.values(category).map((expense, index, array) => {
                    const total = expense.reduce((init, value) => {
                      return init + value.transaction.amount
                    }, 0)
                    return (
                      <div className='px-5 flex flex-col' key={index}>
                        <div
                          className={cn('py-3 flex justify-between', {
                            'border-b border-stone-300 ': index !== array.length - 1
                          })}
                        >
                          <p>{expense[0].category}</p>
                          <p>{handleFormatNumber(total)}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default OverAll
