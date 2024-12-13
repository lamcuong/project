'use client';
import moment from 'moment';
import React, { useMemo } from 'react';
import Item from './item';
import _, { Dictionary } from 'lodash';
import { Expense, FORMAT_VIETNAMESE_DATE } from '@expense-management/shared';
import { groupByDateAndCategory, groupTransactionsByDate } from '../utils';

type ListProps = {
  data: Expense[];
  update?: any;
};

const List: React.FC<ListProps> = ({ data, update }) => {
  const groupByDate = useMemo(() => {
    return groupTransactionsByDate(data);
  }, [data]);
  const groupedList = useMemo(() => {
    return groupByDateAndCategory(groupByDate);
  }, [groupByDate]);

  return Object.keys(groupedList || [])
    .sort((a, b) => {
      const dateA = moment(a, FORMAT_VIETNAMESE_DATE);
      const dateB = moment(b, FORMAT_VIETNAMESE_DATE);
      return Number(dateB) - Number(dateA);
    })
    .map((date, index) => {
      return (
        <div
          className="first:border-t-[1px] border-b-[1px] border-slate-500"
          key={index}
        >
          <Item
            update={update}
            index={index}
            date={date}
            groupedList={groupedList}
            groupedByDate={groupByDate}
          />
        </div>
      );
    });
};

export default List;
