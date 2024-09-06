import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const connectMongo = () => {
  console.log('21321321', process.env.PORT!);
  return mongoose.connect(process.env.MONGODB_HOST!);
};
export default connectMongo;
