import { Request, Response} from 'express';
import CreateDisciplinaService from '../services/CreateDisciplinaService';


export default class DisciplinaController {
    public async create(request: Request, response: Response): Promise<Response> {
    const {descricao, fk_id_curso} = request.body;

    const createUser = new CreateDisciplinaService()

    const disciplina = await createUser.execute({
      descricao,
      fk_id_curso,
    });

    return response.json(disciplina);
  }
}