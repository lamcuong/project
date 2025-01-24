import express from 'express';
import user from './user/index';
import account from './account/index';
import expense from './expense/index';
const route = express();
route.use('/user', user);
route.use('/account', account);
route.use('/expense', expense);
export default route;
