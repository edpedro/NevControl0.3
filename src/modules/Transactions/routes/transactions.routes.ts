import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import TransactionsController from '../controllers/TransactionsController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const transactionsRouter = Router();
const transactionsController = new TransactionsController();

transactionsRouter.post('/list', isAuthenticated, transactionsController.index);

transactionsRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  transactionsController.show,
);

transactionsRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      value: Joi.number().precision(2).required(),
      data: Joi.string().required(),
      category: Joi.string().required(),
      type: Joi.string().required(),
      operation: Joi.string().required(),
      creditCard: Joi.string().allow(null),
    },
  }),
  transactionsController.create,
);

transactionsRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      description: Joi.string().required(),
      value: Joi.number().precision(2).required(),
      data: Joi.string().required(),
      category: Joi.string().required(),
      type: Joi.string().required(),
      operation: Joi.string().required(),
      creditCard: Joi.string().allow(null),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  transactionsController.update,
);

transactionsRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  transactionsController.delete,
);

export default transactionsRouter;
