import { BaseListResponse, BaseResponse } from '@expense-management/shared';

export interface UserInterface {
  username?: string;
  name?: string;
  password?: string;
  email?: string;
  id?: string;
  type?: string;
  avatar?: string;
}
export type LoginResponse = BaseResponse<{ token: string }>;
export type UserResponse = BaseResponse<UserInterface>;
export type UserListResponse = BaseResponse<BaseListResponse<UserInterface>>;
