import container from '@backend/container';
import { ExpenseController } from '@backend/controllers/expense';
import { auth } from '@backend/middleware/auth';
import express from 'express';
const controller = container.get(ExpenseController);

const route = express();
route.post('/create', auth, controller.create);
route.put('/update/:account_id', auth, controller.update);
route.get('/list/:account_id', auth, controller.list);
// route.get('/month-detail/:account_id', auth, controller.monthDetail);
route.delete('/delete/account/:account_id/expense/:expense_id', auth, controller.delete);
export default route;
