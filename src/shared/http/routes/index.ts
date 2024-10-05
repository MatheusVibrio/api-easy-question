import sessionsRouter from '@modules/users/routes/sessions.routes';
import userRouter from '@modules/users/routes/users.routes';
import passwordRouter from '@modules/users/routes/password.routes'
import questionRouter from '@modules/questoes/routes/questoesrouter'
import { Router } from 'express';
import disciplinasrouter from '@modules/disciplina/routes/disciplinasrouter';
import cursoRouter from '@modules/cursos/routes/cursoroutes';

const routes = Router();

routes.use('/users', userRouter); // rota de usuários para CRUDE

routes.use('/sessions', sessionsRouter); // rota de autenticação para login

routes.use('/password', passwordRouter); // rotas de serviços de senha

routes.use('/questoes', questionRouter); // rotas de questões

routes.use('/disciplina', disciplinasrouter); // rotas de disciplinas

routes.use('/cursos', cursoRouter); // rotas de cursos

export default routes;
