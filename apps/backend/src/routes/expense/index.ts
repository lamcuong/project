import container from '@expense-management/backend/container';
import { ExpenseController } from '@expense-management/backend/controllers/expense';
import { auth } from '@expense-management/backend/middleware/auth';
import express from 'express';
const controller = container.get(ExpenseController);

const route = express();
route.post('/create/:account_id', auth, controller.create);
route.put('/update/:account_id', auth, controller.update);
route.get('/list/:account_id', auth, controller.list);
// route.get('/month-detail/:account_id', auth, controller.monthDetail);
route.delete(
  '/delete/account/:account_id/expense/:expense_id',
  auth,
  controller.delete,
);
export default route;
