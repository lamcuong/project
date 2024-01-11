export interface ExpenseInterface {
  type: string
  transaction?: {
    description: string
    date: Date
    amount: number
  }
  category: string
  account_id: string
  id: string
  created_at: string
  updated_at: string
}
export type ExpenseInput = Partial<ExpenseInterface>
export type ExpenseResponse = BaseResponse<ExpenseInterface>
export type ExpenseListResponse = BaseListResponse<ExpenseInterface>
