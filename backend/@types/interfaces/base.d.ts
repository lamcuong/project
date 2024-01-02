declare global {
  namespace ExpenseCore {
    type ID = string | number;
    interface Base {
      id?: ID;
      createdAt?: string;
      updatedAt?: string;
    }
  }
}
export {};
