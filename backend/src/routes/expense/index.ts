import container from '@/container';
import { ExpenseController } from '@/controllers/expense';
import { auth } from '@/middleware/auth';
import express from 'express';
const controller = container.get(ExpenseController);

const route = express();
route.post('/create', auth, controller.create);
route.put('/update', auth, controller.update);
route.get('/list/:account_id', auth, controller.list);
// route.get('/month-detail/:account_id', auth, controller.monthDetail);
route.delete('/delete/:account_id', auth, controller.delete);
export default route;
