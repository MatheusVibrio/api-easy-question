import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';

const userRouter = Router();
const usersController = new UsersController();

userRouter.get('/', usersController.index);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(), // validando email
      senha: Joi.string().required(),
      telefone: Joi.string().required(),
    },
  }),
  usersController.create,
);

export default userRouter
