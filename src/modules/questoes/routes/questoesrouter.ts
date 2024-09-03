import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import QuestoesController from '../controllers/QuestoesController';


const questionRouter = Router();
const questionController = new QuestoesController();

questionRouter.get('/', isAuthenticated ,questionController.aprovadas);
questionRouter.get('/:id_user', isAuthenticated ,questionController.questoesUser);

questionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      enunciado: Joi.string().required(),
      fk_tipo: Joi.number().required(),
      fk_id_usuario: Joi.number().required(),
      fk_id_dificuldade: Joi.number().required(),
      fk_id_disciplina: Joi.number().required(),
    },
  }),
  questionController.create,
);

questionRouter.post(
  '/marcadores',
  celebrate({
    [Segments.BODY]: {
      fk_id_questao: Joi.number().required(),
      marcador: Joi.string().required(),
    },
  }),
  questionController.marcadores,
);

questionRouter.post(
  '/respostas',
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      fg_correta: Joi.string().required(),
      fk_id_questao: Joi.number().required(),
    },
  }),
  questionController.respostas,
);



export default questionRouter
