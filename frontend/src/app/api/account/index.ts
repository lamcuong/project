import { AccountInput, AccountInterface, AccountResponse } from '@/types/account'
import { handleRequest } from '../handle'
import { apiAccount } from '../config'

const create = (input: AccountInput) => {
  return handleRequest<AccountResponse>(`${apiAccount}/create`, {
    method: 'post',
    data: input
  })
}

export const accountApi = {
  create
}
