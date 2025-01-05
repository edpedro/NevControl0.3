import { Router } from 'express';
import creditCardsRouter from '../../../modules/CreditCards/routes/creditCards.routes';
import transactionsRouter from '../../../modules/Transactions/routes/transactions.routes';
import sessionsRouter from '../../../modules/Users/routes/sessions.routes';
import usersRouter from '../../../modules/Users/routes/users.routes';
import isAuthenticated from '../middlewares/isAuthenticated';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/transaction', isAuthenticated, transactionsRouter);
routes.use('/creditCard', isAuthenticated, creditCardsRouter);

export default routes;
