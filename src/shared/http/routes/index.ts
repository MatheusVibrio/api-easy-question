import sessionsRouter from '@modules/users/routes/sessions.routes';
import userRouter from '@modules/users/routes/users.routes';
import passwordRouter from '@modules/users/routes/password.routes'
import { Router } from 'express';

const routes = Router();

routes.use('/users', userRouter); // rota de usuários para CRUDE
routes.use('/sessions', sessionsRouter); // rota de autenticação para login
routes.use('/password', passwordRouter); // rotas de serviços de senha

export default routes;
