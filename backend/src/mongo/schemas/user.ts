import mongoose, { SchemaTypes } from 'mongoose';
import collections from '../collections';
import { defaultPlugin } from '../plugins/defaultPlugin';

const schema = new mongoose.Schema<UserInterface>({
  username: SchemaTypes.String,
  password: SchemaTypes.String,
  email: SchemaTypes.String,
  type: SchemaTypes.String,
  social_id: SchemaTypes.String,
  name: SchemaTypes.String,
  avatar: SchemaTypes.String,
});
defaultPlugin(schema);
const UserModel = mongoose.model(collections.user, schema);
export default UserModel;
