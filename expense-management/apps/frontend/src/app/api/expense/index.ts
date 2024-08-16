import { handleRequest } from '../handle'
import { apiExpense } from '../config'
import { ExpenseListResponse, ExpenseInput, ExpenseResponse } from '@frontend/types/expense'

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
const update = (account_id: string, data: ExpenseInput) => {
  return handleRequest<ExpenseResponse>(`${apiExpense}/update/${account_id}`, {
    method: 'put',
    data
  })
}
const remove = (account_id: string, expense_id: string) => {
  return handleRequest<ExpenseResponse>(`${apiExpense}/delete/account/${account_id}/expense/${expense_id}`, {
    method: 'delete'
  })
}
export const expenseApi = {
  list,
  create,
  update,
  remove
}
