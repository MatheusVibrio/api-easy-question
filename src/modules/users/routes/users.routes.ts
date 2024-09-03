import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../controllers/UserAvatarController';

const userRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UserAvatarController();

const upload = multer(uploadConfig)

userRouter.get('/', isAuthenticated ,usersController.index);

userRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      email: Joi.string().email().required(), // validando email
      senha: Joi.string().required(),
      telefone: Joi.string().required(),
      fk_id_tipo: Joi.number().required(),
    },
  }),
  usersController.create,
);

// Rota de imagens para fazer upload do avatar, '/users/avatar'
userRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default userRouter
