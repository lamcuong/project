import mongoose from 'mongoose';
export const defaultPlugin = (schema: mongoose.Schema) => {
  // schema.virtual('id').get(function getId() {
  //   return this._id.toHexString();
  // });

  schema.set('toJSON', {
    virtuals: true,
  });
  schema.set('toObject', {
    virtuals: true,
    transform: (doc, ret) => {
      delete ret._id;
      delete ret.__v;
      return ret;
    },
  });
};
