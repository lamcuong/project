'use client'
import moment from 'moment'
import React, { useMemo } from 'react'
import Item from './item'
import _ from 'lodash'

type ListProps = {
  data: Expense[]
  paging?: Paging
  overallType: string
  isFetching?: boolean
}

const List: React.FC<ListProps> = ({ paging, data, isFetching, overallType }) => {
  // const groupedList = data?.reduce((groups: any, item) => {
  //   const date = moment(item.transaction?.date).format('[Ngày] DD [Tháng] MM [Năm] YYYY');
  //   if (!groups[date]) {
  //     groups[date] = [];
  //   }
  //   groups[date].push(item);
  //   return groups;
  // }, {});

  const groupByDate = useMemo(() => {
    return _.groupBy(data, (item) => {
      return moment(item.transaction?.date).format('[Ngày] DD [Tháng] MM [Năm] YYYY')
    })
  }, [data])
  const groupByMonth = useMemo(() => {
    return _.groupBy(data, (transaction) => {
      return moment(transaction.transaction?.date).format('[Tháng] MM - YYYY')
    })
  }, [data])
  const overallList = useMemo(() => {
    const list = _.mapValues(groupByMonth, (group) => {
      return _.groupBy(group, (transaction) => {
        return moment(transaction.transaction?.date).format('[Ngày] DD [Tháng] MM [Năm] YYYY')
      })
    })
    return list
  }, [groupByMonth])
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
      const month = moment(date, '[Ngày] DD [Tháng] MM [Năm] YYYY').month()
      return (
        <div className='first:border-t-[1px] border-b-[1px] border-slate-500' key={index}>
          <Item
            overallList={overallList}
            overallType={overallType}
            month={month}
            index={index}
            date={date}
            groupedList={groupedList}
            groupedByDate={groupByDate}
          />
          {/* <Separator className="bg-slate-300" /> */}
        </div>
      )
    })
}

export default List
