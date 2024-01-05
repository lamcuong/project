export interface AccountInterface {
  name: string
  initialBalance: number
  id?: string
  balance: number
}
export type AccountInput = Omit<AccountInterface, 'id' | 'balance'>
export type AccountResponse = BaseResponse<AccountInterface>
export type AccountListResponse = BaseResponse<BaseListResponse<AccountInterface>>
