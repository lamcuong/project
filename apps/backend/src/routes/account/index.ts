import container from '@expense-management/backend/container';
import { AccountController } from '@expense-management/backend/controllers/account';
import { auth } from '@expense-management/backend/middleware/auth';
import express from 'express';

const route = express();
const controller = container.get(AccountController);
route.post('/create', auth, controller.create);
route.put('/update/', auth, controller.update);
route.get('/detail/:accountId', auth, controller.detail);
route.delete('/delete/:accountId', auth, controller.delete);
route.get('/list', auth, controller.list);
export default route;
