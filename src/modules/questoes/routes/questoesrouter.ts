import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import QuestoesController from '../controllers/QuestoesController';


const questionRouter = Router();
const questionController = new QuestoesController();

questionRouter.get('/', isAuthenticated ,questionController.aprovadas); // numero de questões aprovadas
questionRouter.get('/:id_user', isAuthenticated ,questionController.questoesUser); // número de questões do user

questionRouter.get('/minhasquestoes/:id_user', isAuthenticated ,questionController.minhasQuestoes); // todas questões por usuário (detalhes)
questionRouter.get('/minhasquestoes/reprovadas/:id_user', isAuthenticated ,questionController.minhasQuestoesReprovadas); // todas questões por usuário reprovadas (detalhes)
questionRouter.get('/minhasquestoes/aprovadas/:id_user', isAuthenticated ,questionController.minhasQuestoesAprovadas); // todas questões por usuário aprovadas (detalhes)

questionRouter.get('/detalhes/:id_questao', isAuthenticated ,questionController.detalhesQuestoes); // detalhe questão por questão (card)

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

questionRouter.delete('/:id_questao', isAuthenticated ,questionController.deletaQuestao); // questões aprovadas por usuário

questionRouter.put(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      fg_aprovada: Joi.string().required(),
      id_questao: Joi.number().required(),
    },
  }),
  questionController.update,
);

export default questionRouter
