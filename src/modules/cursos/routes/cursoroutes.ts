import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import CursoController from '../controller/CursoController';


const cursoRouter = Router();
const cursoController = new CursoController();

cursoRouter.get('/', isAuthenticated ,cursoController.list); // lista todos os cursos

export default cursoRouter
