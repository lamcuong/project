import container from '@expense-management/backend/container';
import { ExpenseController } from '@expense-management/backend/controllers/expense';
import { auth } from '@expense-management/backend/middleware/auth';
import express from 'express';
const controller = container.get(ExpenseController);

const route = express();
route.post('/:accountId', auth, controller.create);
route.put('/:accountId', auth, controller.update);
route.get('/list/:accountId', auth, controller.list);
route.delete('/account/:accountId/expense/:expenseId', auth, controller.delete);
export default route;
