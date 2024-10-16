import { env } from '@expense-management/frontend/config/env';

const baseURL = env.BASE_URL;
export const apiUser = `${baseURL}/user`;
export const apiAccount = `${baseURL}/account`;
export const apiExpense = `${baseURL}/expense`;
