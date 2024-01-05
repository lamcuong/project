declare global {
  interface Expense {
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
  type ExpenseInput = Partial<ExpenseCore.Expense>
}
export {}
