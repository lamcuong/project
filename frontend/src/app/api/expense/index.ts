import { ExpenseInput, ExpenseListResponse, ExpenseResponse } from '@/types/expense'
import { handleRequest } from '../handle'
import { apiExpense } from '../config'

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
export const expenseApi = {
  list,
  create
}
