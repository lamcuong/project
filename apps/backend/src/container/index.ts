import 'reflect-metadata';
import { Container } from 'inversify';

/* ------- Controller ----------- */
import { UserController } from '../controllers/user';

/* ------- Service ----------- */
import { UserService } from '../services/user';
import { AccountService } from '../services/account';
import { ExpenseService } from '@expense-management/backend/services/expense';
import { AccountController } from '@expense-management/backend/controllers/account';
import { ExpenseController } from '@expense-management/backend/controllers/expense';

const controllerContainer = new Container();

controllerContainer.bind<UserController>(UserController).toSelf();
controllerContainer.bind<AccountController>(AccountController).toSelf();
controllerContainer.bind<ExpenseController>(ExpenseController).toSelf();

const serviceContainer = new Container();

serviceContainer.bind<UserService>(UserService).toSelf();
serviceContainer.bind<AccountService>(AccountService).toSelf();
serviceContainer.bind<ExpenseService>(ExpenseService).toSelf();

const container = Container.merge(controllerContainer, serviceContainer);

export default container;
