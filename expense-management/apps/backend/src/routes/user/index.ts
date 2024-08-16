import container from '@backend/container';
import { UserController } from '@backend/controllers/user';
import { auth } from '@backend/middleware/auth';
import express from 'express';

const route = express();
const controller = container.get(UserController);
route.post('/sign-up', controller.signUp);
route.post('/sign-in', controller.signIn);
route.get('/me', auth, controller.me);
route.post('/google-sign-in', controller.googleSignIn);
export default route;
