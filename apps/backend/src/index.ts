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
    app.get('/', async (req, res) => {
      try {
        // for(let i =0;i<50;i++){
        //   const test = await ExpenseModel.create({account:"65a652acd860358034647946",category:'Ăn uống',transaction:{amount:100,description:"seed"},type:'outcome'})

        // }
        res.send('test-ci-time');
      } catch (error) {
        console.log(error);
      }
    });

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
