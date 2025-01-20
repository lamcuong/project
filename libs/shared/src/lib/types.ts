import { ExpenseType } from './enum';

export type BaseEntity = {
  id: string;
  createdAt: Date;
};
export type Entity<T> = {
  [K in keyof T]: T[K];
} & BaseEntity;

export type BaseListResponse<T> = BaseResponse<ListResponse<T>>;

export interface BaseResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  status?: number;
}
export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  limit: number;
  count: number;
}

export interface ListResponse<T> {
  list: T[];
  paging: PaginationInfo;
}

export interface BaseParams<T = unknown> {
  meta?: {
    limit?: number;
    page?: number;
    search?: string;
  };
  input?: T;
  id?: string;
}
export type Account = Entity<{
  name: string;
  initialBalance: number;
  balance: number;
}>;

export type Expense = Entity<{
  type: ExpenseType;
  transaction: {
    description: string;
    date: Date;
    amount: number;
  };
  category: string;
  account_id: string;
  created_at: string;
  updated_at: string;
}>;
export type User = Entity<{
  username: string;
  password: string;
  email: string;
  type: string;
  social_id: string;
  name: string;
  avatar: string;
}>;
