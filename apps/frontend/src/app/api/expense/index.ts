import { handleRequest } from '../handle'
import { apiExpense } from '../config'
import {
  ExpenseListResponse,
  ExpenseInput,
  ExpenseResponse,
} from '@expense-management/frontend/types/expense';
import { BaseResponse } from '@expense-management/shared';

const list = (id: string) => {
  return handleRequest<BaseResponse<ExpenseListResponse>>(`${apiExpense}/list/${id}`, {
    method: 'get'
  })
}
const create = (data: ExpenseInput) => {
  return handleRequest<ExpenseResponse>(`${apiExpense}/create`, {
    method: 'post',
    data
  })
}
const update = (accountId: string, data: ExpenseInput) => {
  return handleRequest<ExpenseResponse>(`${apiExpense}/update/${accountId}`, {
    method: 'put',
    data,
  });
};
const remove = (accountId: string, expenseId: string) => {
  return handleRequest<ExpenseResponse>(
    `${apiExpense}/delete/account/${accountId}/expense/${expenseId}`,
    {
      method: 'delete',
    },
  );
};
export const expenseApi = {
  list,
  create,
  update,
  remove
}
