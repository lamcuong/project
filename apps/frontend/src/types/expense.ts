import { BaseListResponse, BaseResponse } from '@expense-management/shared';

export interface ExpenseInterface {
  type: string;
  transaction: {
    description: string;
    date: Date;
    amount: number;
  };
  category: string;
  accountId: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}
export type ExpenseInput = Partial<ExpenseInterface>;
export type ExpenseResponse = BaseResponse<ExpenseInterface>;
export type ExpenseListResponse = BaseListResponse<ExpenseInterface>;
