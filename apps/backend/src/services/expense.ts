import AccountModel from '@expense-management/backend/mongo/schemas/account';
import ExpenseModel from '@expense-management/backend/mongo/schemas/expense';
import { ExpenseType } from '@expense-management/shared';
import { injectable } from 'inversify';
import mongoose from 'mongoose';

@injectable()
export class ExpenseService {
  public create = async (input: ExpenseInput) => {
    const expense = await (
      await ExpenseModel.create(input)
    ).populate('account');
    if (!expense) throw new Error('Create expense failed');
    const amount =
      expense.type === ExpenseType.Income
        ? expense.transaction?.amount
        : -expense.transaction?.amount;
    await AccountModel.findOneAndUpdate(
      { _id: expense.account.id, user: expense.account.user },
      {
        $inc: {
          balance: amount,
        },
      },
      { new: true },
    );
    return expense.toObject();
  };
  public update = async (
    expenseId: ExpenseCore.ID,
    accountId: ExpenseCore.ID,
    input: ExpenseInput,
  ) => {
    const expense = await (
      await ExpenseModel.findOneAndUpdate(
        { _id: expenseId, account: accountId },
        { $set: input },
      )
    ).populate('account');
    if (!expense) throw new Error('Not found');
    if (
      input.transaction?.amount !== expense.transaction?.amount ||
      input.type !== expense.type
    ) {
      // const newBalance = await ExpenseModel.aggregate([
      //   {
      //     $match: {
      //       account: new mongoose.Types.ObjectId(accountId),
      //     },
      //   },
      //   {
      //     $group: {
      //       _id: null,
      //       newBalance: {
      //         $sum: {
      //           $cond: [{ $eq: ['$type', 'income'] }, '$transaction.amount', { $subtract: [0, '$transaction.amount'] }],
      //         },
      //       },
      //     },
      //   },
      // ]);
      const account = await AccountModel.findById(accountId);
      if (!account) throw new Error('Account not found');

      const newBalance = await account.getNewBalance();
      account.balance = newBalance;
      await account.save();
    }
    return expense?.toObject();
  };
  public list = async (
    accountId: ExpenseCore.ID,
    limit: number,
    page: number,
  ) => {
    const skip = (page - 1) * limit;
    const list = await ExpenseModel.aggregate([
      {
        $match: {
          account: new mongoose.Types.ObjectId(accountId),
        },
      },

      {
        $sort: {
          createdAt: -1,
        },
      },

      {
        $project: {
          _id: 0,
          id: '$_id',
          type: 1,
          transaction: 1,
          category: 1,
          updatedAt: 1,
          createdAt: 1,
        },
      },
      {
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          total: [{ $count: 'count' }],
        },
      },
    ]);
    const count = list[0].total[0]?.count;
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
  public delete = async (
    accountId: ExpenseCore.ID,
    expenseId: ExpenseCore.ID,
  ) => {
    const expense = await ExpenseModel.findOneAndDelete(
      { account: accountId, _id: expenseId },
      {},
    );
    if (!expense) throw new Error('Expense not found');
    await AccountModel.findOneAndUpdate(
      { _id: accountId },
      {
        $inc: {
          balance:
            expense.type === ExpenseType.Income
              ? -expense.transaction?.amount
              : expense.transaction?.amount,
        },
      },
    );
    return expense.toObject();
  };
  public monthDetail = async (accountId: ExpenseCore.ID) => {
    // const skip = limit * (page - 1);
    // const list = await ExpenseModel.aggregate([
    //   {
    //     $match: {
    //       account: new mongoose.Types.ObjectId(accountId),
    //     },
    //   },
    //   {
    //     $group: {
    //       _id: {
    //         year: { $year: '$transaction.year' },
    //         month: { $month: '$transaction.date' },
    //         day: {
    //           $cond: {
    //             if: { $eq: [type, 'day'] },
    //             then: { $dayOfMonth: '$transaction.date' },
    //             else: null,
    //           },
    //         },
    //       },
    //       transactions: {
    //         $push: '$$ROOT',
    //       },
    //       totalAmount: { $sum: '$transaction.amount' },
    //     },
    //   },
    //   {
    //     $project: {
    //       _id: 0,
    //       date: '$_id',
    //       transactions: 1,
    //       totalAmount: 1,
    //     },
    //   },
    //   {
    //     $sort: {
    //       created_at: -1,
    //     },
    //   },
    //   {
    //     $facet: {
    //       data: [{ $skip: skip }, { $limit: limit }],
    //       total: [{ $count: 'count' }],
    //     },
    //   },
    // ]);
    // const count = list[0].total[0]?.count;

    // console.log('12312312', list);
    // return {
    //   data: list[0].data,
    //   paging: {
    //     current_page: page,
    //     limit: limit,
    //     total_page: Math.ceil(count / limit),
    //     count: count,
    //   },
    // };
    const list = await ExpenseModel.aggregate([
      {
        $match: {
          account: new mongoose.Types.ObjectId(accountId),
        },
      },
      {
        $group: {
          _id: {
            year: { $year: '$transaction.date' },
            month: { $month: '$transaction.date' },
          },
          transactions: {
            $push: '$$ROOT',
          },
          totalAmount: { $sum: '$transaction.amount' },
        },
      },
    ]);
    return list;
  };
}
