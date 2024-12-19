import {
  Expense,
  ExpenseType,
  FORMAT_VIETNAMESE_DATE,
} from '@expense-management/shared';
import { Dictionary, groupBy, mapValues } from 'lodash';
import moment from 'moment';

export const groupTransactionsByDate = (transactions: Expense[]) => {
  return groupBy(transactions, (item) =>
    moment(item.transaction.date).format(FORMAT_VIETNAMESE_DATE),
  );
};
export const groupByDateAndCategory = (
  groupedByDate: Dictionary<Expense[]>,
) => {
  return mapValues(groupedByDate, (item) => groupBy(item, 'category'));
};

export const calculateDailyExpense = (expenses: Expense[]) => {
  return expenses.reduce((sum, expense) => {
    return (
      sum +
      (expense.type === ExpenseType.Income
        ? expense.transaction.amount
        : -expense.transaction.amount)
    );
  }, 0);
};
export const expenseTypeOptions = [
  {
    value: ExpenseType.Outcome,
    label: 'Chi tiền',
  },
  {
    value: ExpenseType.Income,
    label: 'Thu tiền',
  },
];
export const outcomeOptions = [
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
export const incomeOptions = [
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
