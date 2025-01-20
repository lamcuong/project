import mongoose, { SchemaTypes } from 'mongoose';
import collections from '../collections';
import { defaultPlugin } from '../plugins/defaultPlugin';

const schema = new mongoose.Schema<ExpenseCore.Expense>(
  {
    account: {
      type: SchemaTypes.ObjectId,
      ref: collections.account,
    },
    category: SchemaTypes.String,
    type: SchemaTypes.String,
    transaction: {
      amount: SchemaTypes.Number,
      description: SchemaTypes.String,
      date: SchemaTypes.Date,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } },
);
defaultPlugin(schema);
const ExpenseModel = mongoose.model(collections.expense, schema);
export default ExpenseModel;
