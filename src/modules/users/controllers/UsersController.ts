import CreateUserService from "../services/CreateUserService";
import ListUserService from "../services/ListUserService";
import { Request, Response} from 'express';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListUserService();

    const users = await listUser.execute();

    return response.json(users)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {nome, email, senha, telefone, fk_id_tipo, fk_id_curso} = request.body;

    const createUser = new CreateUserService

    const user = await createUser.execute({
      nome,
      email,
      senha,
      telefone,
      fg_primeiro_acesso: 'S',
      fk_id_tipo,
      fk_id_curso
    });

    return response.json(user);
  }
}
