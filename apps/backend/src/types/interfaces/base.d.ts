declare global {
  namespace ExpenseCore {
    type ID = string | number | ObjectId;
    interface Base {
      id?: ID;
      createdAt?: string;
      updatedAt?: string;
    }
  }
}
export {};
