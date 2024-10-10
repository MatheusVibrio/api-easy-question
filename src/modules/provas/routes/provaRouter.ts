import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import ProvaController from '../controller/ProvaController';


const provaRouter = Router();
const provaController = new ProvaController();

provaRouter.get('/quantidade', isAuthenticated ,provaController.listSistema); // lista a quantidade de provas geradas no sistema
provaRouter.get('/:id_user', isAuthenticated ,provaController.list); // lista todas as provas dado o user


provaRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      fk_id_disciplina: Joi.number().required(),
      fk_id_usuario: Joi.number().required(),
    },
  }),
  provaController.create,
);

provaRouter.post(
  '/questoes',
  celebrate({
    [Segments.BODY]: Joi.array().items(
      Joi.object().keys({
        ordem: Joi.number().required(),
        fk_id_questao: Joi.number().required(),
        fk_id_prova: Joi.number().required(),
      })
    ).required(),
  }),
  provaController.createQuestoes,
);

provaRouter.delete('/:id_prova', isAuthenticated ,provaController.delete); // questões aprovadas por usuário

export default provaRouter



