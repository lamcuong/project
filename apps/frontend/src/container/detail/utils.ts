import { Expense, FORMAT_VIETNAMESE_DATE } from '@expense-management/shared';
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
