import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import CreditCardsController from '../controllers/CreditCardsController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const creditCardsRouter = Router();
const creditCardsController = new CreditCardsController();

creditCardsRouter.post('/list', creditCardsController.index);

creditCardsRouter.post(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  creditCardsController.show,
);

creditCardsRouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      limit: Joi.number().required(),
      close: Joi.string().required(),
      win: Joi.string().required(),
      bank: Joi.string().required(),
    },
  }),
  creditCardsController.create,
);

creditCardsRouter.put(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      limit: Joi.number().required(),
      close: Joi.string().required(),
      win: Joi.string().required(),
      bank: Joi.string().required(),
    },
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  creditCardsController.update,
);

creditCardsRouter.delete(
  '/:id',
  isAuthenticated,
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  creditCardsController.delete,
);

creditCardsRouter.post(
  '/invoce/:id',
  isAuthenticated,
  creditCardsController.invoce,
);

export default creditCardsRouter;
