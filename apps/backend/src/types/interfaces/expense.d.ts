declare global {
  namespace ExpenseCore {
    interface Expense {
      type: string;
      transaction?: {
        description: string;
        date?: Date;
        amount: number;
      };
      category: string;
      account: ExpenseCore.Account;
    }
  }
  type ExpenseInput = {
    type: string;
    transaction: {
      description?: string;
      date: Date;
      amount: number;
    };
    category: string;
    account: string;
  };
}
export {};
