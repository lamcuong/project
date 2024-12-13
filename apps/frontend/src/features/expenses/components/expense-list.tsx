'use client';
import { useParams } from 'next/navigation';
import { useExpenses } from '../api/get-expenses';
import { Skeleton } from '@expense-management/frontend/components/ui/skeleton';
import List from '@expense-management/frontend/container/detail/components/list';
import { useMemo } from 'react';
import { groupByDateAndCategory, groupTransactionsByDate } from '../utils';
import { FORMAT_VIETNAMESE_DATE } from '@expense-management/shared';
import moment from 'moment';
import Item from '@expense-management/frontend/container/detail/components/item';
import ExpenseItem from './expense-item';

type ExpenseListProps = {};

const ExpenseList = () => {
  const { id } = useParams();
  const expenseQuery = useExpenses({ accountId: id as string });
  const groupedByDate = useMemo(() => {
    return groupTransactionsByDate(expenseQuery.data?.data.list || []);
  }, [expenseQuery.data?.data.list]);

  const groupedList = useMemo(() => {
    return groupByDateAndCategory(groupedByDate);
  }, [groupedByDate]);
  if (expenseQuery.isLoading) {
    return <Skeleton className="mt-5 h-20" times={1} gap={5} />;
  }

  const expenses = expenseQuery.data?.data.list || [];
  return (
    <div>
      <h2 className="text-left font-[600] text-lg">Lịch sử giao dịch</h2>

      <div className="mt-5">
        {expenses.length > 0 ? (
          Object.keys(groupedList || [])
            .sort(
              (a, b) =>
                Number(moment(b, FORMAT_VIETNAMESE_DATE)) -
                Number(moment(a, FORMAT_VIETNAMESE_DATE)),
            )
            .map((date, index) => {
              return (
                <div
                  key={date}
                  className="first:border-t-[1px] border-b-[1px] border-slate-500"
                >
                  <ExpenseItem
                    groupedList={groupedList}
                    date={date}
                    groupedByDate={groupedByDate}
                    index={index}
                  />
                </div>
              );
            })
        ) : (
          <p className="text-3xl text-center mt-20">Chưa có giao dịch nào</p>
        )}
      </div>
    </div>
  );
};

export default ExpenseList;
