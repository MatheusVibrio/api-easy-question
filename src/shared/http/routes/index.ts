import sessionsRouter from '@modules/users/routes/sessions.routes';
import userRouter from '@modules/users/routes/users.routes';
import { Router } from 'express';

const routes = Router();

routes.use('/users', userRouter); // rota de usuários para CRUDE
routes.use('/sessions', sessionsRouter); // rota de autenticação para login

export default routes;
