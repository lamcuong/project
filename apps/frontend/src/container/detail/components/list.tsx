'use client'
import moment from 'moment'
import React, { useMemo } from 'react'
import Item from './item'
import _ from 'lodash'
import { ExpenseInterface } from '@frontend/types/expense'

type ListProps = {
  data: ExpenseInterface[]
  update?: any
}

const List: React.FC<ListProps> = ({ data, update }) => {
  const groupByDate = useMemo(() => {
    return _.groupBy(data, (item) => {
      return moment(item.transaction?.date).format('[Ngày] DD [Tháng] MM [Năm] YYYY')
    })
  }, [data])
  const groupedList = useMemo(() => {
    const groupedByDateAndCategory = _.mapValues(groupByDate, (group) => {
      return _.groupBy(group, 'category')
    })
    return groupedByDateAndCategory
  }, [groupByDate])

  return Object.keys(groupedList || [])
    .sort((a, b) => {
      const dateA = moment(a, '[Ngày] DD [Tháng] MM [Năm] YYYY')
      const dateB = moment(b, '[Ngày] DD [Tháng] MM [Năm] YYYY')
      return Number(dateB) - Number(dateA)
    })
    .map((date, index) => {
      return (
        <div className='first:border-t-[1px] border-b-[1px] border-slate-500' key={index}>
          <Item update={update} index={index} date={date} groupedList={groupedList} groupedByDate={groupByDate} />
        </div>
      )
    })
}

export default List
