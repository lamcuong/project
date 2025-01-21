import bodyParser from 'body-parser';
import connectMongo from './mongo/config';
import express, { Express } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import route from './routes';
import dotenv from 'dotenv';
import cors from 'cors';
import { httpResponse } from './middleware/httpResponse';
import { ExpenseType } from '@expense-management/shared';
dotenv.config();
connectMongo()
  .then(async () => {
    console.log('Connect Successfully!');
    const app: Express = express();
    app.use(morgan('common'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(httpResponse);

    app.use(helmet());
    app.use(cors());

    app.use('/api/', route);
    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.log('🚀 ~ file: index.ts:44 ~ e', e);
    console.log('Connect fail!');
    process.exit(1);
  });
