import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import QuestoesController from '../controllers/QuestoesController';


const questionRouter = Router();
const questionController = new QuestoesController();

questionRouter.get('/aprovadas', isAuthenticated ,questionController.aprovadas); // numero de questões aprovadas
questionRouter.get('/:id_user', isAuthenticated ,questionController.questoesUser); // número de questões do user

questionRouter.get('/minhasquestoes/:id_user', isAuthenticated ,questionController.minhasQuestoes); // todas questões por usuário (detalhes)
questionRouter.get('/minhasquestoes/reprovadas/:id_user', isAuthenticated ,questionController.minhasQuestoesReprovadas); // todas questões por usuário reprovadas (detalhes)
questionRouter.get('/minhasquestoes/aprovadas/:id_user', isAuthenticated ,questionController.minhasQuestoesAprovadas); // todas questões por usuário aprovadas (detalhes)
questionRouter.get('/minhasquestoes/analise/:id_curso', isAuthenticated ,questionController.minhasQuestoesAnalise); // todas questões para análise

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
      comentario: Joi.string().allow(''), // Permite string vazia
    },
  }),
  questionController.update,
);

questionRouter.put(
  '/alterar',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      id_questao: Joi.number().required(),
      questao: Joi.string().required(),
      fk_id_disciplina: Joi.number().required(),
      fk_id_dificuldade: Joi.number().required(),
      marcadores: Joi.array().items(Joi.string()).required(), // Array de strings
      respostas: Joi.array().items(
        Joi.object({
          resposta: Joi.string().required(),
          correta: Joi.string().valid('S', 'N').required(), // 'S' ou 'N' para correta
        })
      ).required(), // Array de objetos
    },
  }),
  questionController.updateQuestion,
);



export default questionRouter
