import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  sessionsController.create,
);

sessionsRouter.post(
  '/googlelogin',
  celebrate({
    [Segments.BODY]: {
      googleToken: Joi.string().required(),
    },
  }),
  sessionsController.createGoogleLogin,
);

export default sessionsRouter;
