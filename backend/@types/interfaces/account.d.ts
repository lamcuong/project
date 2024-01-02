declare global {
  namespace ExpenseCore {
    interface Account {
      name: string;
      initialBalance: number;
      user?: ID;
      id: ID;
      balance: number;
    }
  }
  type AccountInput = Partial<ExpenseCore.Account>;
}
export {};
