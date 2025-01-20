import container from '@expense-management/backend/container';
import { AccountController } from '@expense-management/backend/controllers/account';
import { auth } from '@expense-management/backend/middleware/auth';
import express from 'express';

const route = express();
const controller = container.get(AccountController);
route.post('/', auth, controller.create);
route.put('/', auth, controller.update);
route.get('/:accountId', auth, controller.detail);
route.delete('/:accountId', auth, controller.delete);
route.get('/', auth, controller.list);
export default route;
