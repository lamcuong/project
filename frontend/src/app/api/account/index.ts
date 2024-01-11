import { AccountInput, AccountListResponse, AccountResponse } from '@/types/account'
import { handleRequest } from '../handle'
import { apiAccount } from '../config'

const create = (input: AccountInput) => {
  return handleRequest<AccountResponse>(`${apiAccount}/create`, {
    method: 'post',
    data: input
  })
}
const list = (params: BaseParams) => {
  return handleRequest<AccountListResponse>(`${apiAccount}/list`, {
    method: 'get',
    params
  })
}
const remove = (id?: string) => {
  return handleRequest<AccountResponse>(`${apiAccount}/delete/${id}`, {
    method: 'delete'
  })
}

const detail = (id: string) => {
  return handleRequest<AccountResponse>(`${apiAccount}/detail/${id}`, {
    method: 'get'
  })
}
export const accountApi = {
  create,
  list,
  remove,
  detail
}
