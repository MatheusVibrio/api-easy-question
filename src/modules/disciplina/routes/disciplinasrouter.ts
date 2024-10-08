import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import DisciplinaController from '../controller/DisciplinaController';


const disciplinasrouter = Router();
const disciplinaController = new DisciplinaController();

disciplinasrouter.get('/', isAuthenticated ,disciplinaController.list); // para listar todas as disciplinas
disciplinasrouter.get('/:id_curso', isAuthenticated ,disciplinaController.listPorCurso); // para listar todas as disciplinas por  curso
disciplinasrouter.get('/det/:id_disciplina', isAuthenticated ,disciplinaController.listById); // trazer disciplina pelo id

disciplinasrouter.post(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      descricao: Joi.string().required(),
      fk_id_curso: Joi.number().required(),
    },
  }),
  disciplinaController.create,
);

disciplinasrouter.delete('/:id_disciplina', isAuthenticated ,disciplinaController.deletaDisciplina);

disciplinasrouter.put(
  '/',
  isAuthenticated,
  celebrate({
    [Segments.BODY]: {
      id_disciplina: Joi.number().required(),
      descricao: Joi.string().required(),
      fk_id_curso: Joi.number().required(),
    },
  }),
  disciplinaController.update,
);


export default disciplinasrouter
