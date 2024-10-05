import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import DisciplinaController from '../controller/DisciplinaController';


const disciplinasrouter = Router();
const disciplinaController = new DisciplinaController();

disciplinasrouter.get('/', isAuthenticated ,disciplinaController.list); // para listar todas as disciplinas

disciplinasrouter.get('/:id_curso', isAuthenticated ,disciplinaController.listPorCurso); // para listar todas as disciplinas por  curso

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



export default disciplinasrouter
