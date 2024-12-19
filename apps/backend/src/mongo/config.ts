import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const connectMongo = () => {
  return mongoose.connect(process.env.MONGODB_HOST!);
};
export default connectMongo;
