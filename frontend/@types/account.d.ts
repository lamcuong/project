declare global {
  interface AccountInterface {
    name: string;
    initialBalance: number;
    id?: ID;
    balance?: number;
  }
}
export {};
