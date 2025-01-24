import {  injectable } from 'inversify';
import AccountModel from '../mongo/schemas/account';
import mongoose from 'mongoose';
import ExpenseModel from '@expense-management/backend/mongo/schemas/expense';
@injectable()
export class AccountService {
  regex = (pattern: string) => new RegExp(`.*${pattern}.*`);
  public create = async (input: AccountInput) => {
    const account = await AccountModel.create(input);
    return account.toObject();
  };
  public update = async (accountId: ExpenseCore.ID, input: AccountInput) => {
    const account = await AccountModel.findOneAndUpdate(
      { _id: accountId, user: input.user },
      input,
    );
    if (!account) throw new Error('Account not found!');
    account.balance += input.initialBalance - account.initialBalance;
    await account.save();
    return account?.toObject();
  };
  public delete = async (accountId: ExpenseCore.ID, userId: ExpenseCore.ID) => {
    const account = await AccountModel.findOneAndDelete(
      { _id: accountId, user: userId },
      {},
    );
    await ExpenseModel.deleteMany({ account: accountId });
    return account?.toObject();
  };
  public detail = async (accountId: ExpenseCore.ID, userId: ExpenseCore.ID) => {
    const account = await AccountModel.findOne({
      _id: accountId,
      user: userId,
    });
    return account?.toObject();
  };
  public list = async (
    userId: string,
    limit: number,
    page: number,
    search?: string,
  ) => {
    const skip = (page - 1) * limit;
    const list = await AccountModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId as string),
          ...(search
            ? {
                $or: [
                  { balance: { $regex: this.regex(search), $options: 'i' } },
                  { name: { $regex: this.regex(search), $options: 'i' } },
                ],
              }
            : {}),
        },
      },
      {
        $project: {
          _id: 0,
          id: '$_id',
          name: 1,
          balance: 1,
          initialBalance: 1,
          updatedAt: 1,
          createdAt: 1,
        },
      },
      {
        $sort: {
          updatedAt: -1,
        },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          total: [{ $count: 'count' }],
        },
      },
    ]);
    const count = list[0]?.total[0]?.count;
    return {
      list: list[0].data,
      paging: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        limit,
        count,
      },
    };
  };
}
