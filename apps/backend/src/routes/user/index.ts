import container from '@expense-management/backend/container';
import { UserController } from '@expense-management/backend/controllers/user';
import { auth } from '@expense-management/backend/middleware/auth';
import express from 'express';

const route = express();
const controller = container.get(UserController);
route.post('/sign-up', controller.signUp);
route.post('/sign-in', controller.signIn);
route.get('/me', auth, controller.me);
route.post('/google-sign-in', controller.googleSignIn);
export default route;
