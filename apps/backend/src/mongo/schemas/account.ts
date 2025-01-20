import mongoose, { SchemaTypes, Model } from 'mongoose';
import collections from '../collections';
import { defaultPlugin } from '../plugins/defaultPlugin';
import ExpenseModel from './expense';
import { ExpenseType } from '@expense-management/shared';
interface AccountMethods {
  getNewBalance(): Promise<number>;
}
type AccountModel = Model<ExpenseCore.Account, {}, AccountMethods>;
const schema = new mongoose.Schema<
  ExpenseCore.Account,
  AccountModel,
  AccountMethods
>(
  {
    name: {
      type: SchemaTypes.String,
      required: true,
    },
    initialBalance: {
      type: SchemaTypes.Number,
      required: true,
    },
    balance: SchemaTypes.Number,
    user: {
      type: SchemaTypes.ObjectId,
      ref: collections.user,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
defaultPlugin(schema);

schema.methods.getNewBalance = async function () {
  const newBalance = await ExpenseModel.aggregate([
    {
      $match: {
        account: this._id,
      },
    },
    {
      $group: {
        _id: null,
        newBalance: {
          $sum: {
            $cond: [
              { $eq: ['$type', ExpenseType.Income] },
              '$transaction.amount',
              { $subtract: [0, '$transaction.amount'] },
            ],
          },
        },
      },
    },
  ]);
  return this.initialBalance + newBalance[0].newBalance;
};

const Account = mongoose.model<ExpenseCore.Account, AccountModel>(
  collections.account,
  schema,
);
export default Account;
