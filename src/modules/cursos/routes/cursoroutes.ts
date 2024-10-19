import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import CursoController from '../controller/CursoController';


const cursoRouter = Router();
const cursoController = new CursoController();

cursoRouter.get('/', isAuthenticated ,cursoController.list); // lista todos os cursos
cursoRouter.get('/:id_usuario', isAuthenticated ,cursoController.listPorUser); // lista todos os cursos do usuario

export default cursoRouter
