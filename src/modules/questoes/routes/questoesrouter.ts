import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';
import QuestoesController from '../controllers/QuestoesController';


const questionRouter = Router();
const questionController = new QuestoesController();

questionRouter.get('/', isAuthenticated ,questionController.index);



export default questionRouter
