import mongoose, { SchemaTypes } from 'mongoose';
import collections from '../collections';
import { defaultPlugin } from '../plugins/defaultPlugin';
import ExpenseModel from './expense';
const schema = new mongoose.Schema<ExpenseCore.Account>(
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
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
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
            $cond: [{ $eq: ['$type', 'income'] }, '$transaction.amount', { $subtract: [0, '$transaction.amount'] }],
          },
        },
      },
    },
  ]);
  return this.initialBalance + newBalance[0].newBalance;
};

const AccountModel = mongoose.model(collections.account, schema);
export default AccountModel;
