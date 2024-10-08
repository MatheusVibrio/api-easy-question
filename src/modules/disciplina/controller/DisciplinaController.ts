import { Request, Response} from 'express';
import CreateDisciplinaService from '../services/CreateDisciplinaService';
import ListDiscplinaService from '../services/ListDisciplinaService';
import DeleteDisciplina from '../services/DeleteDisciplina';

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

  public async list(request: Request, response: Response): Promise<Response> {
    const listDisciplina = new ListDiscplinaService();

    const disciplinas = await listDisciplina.listarTodas();

    return response.json(disciplinas)
  }

  public async listPorCurso(request: Request, response: Response): Promise<Response> {
    const fk_id_curso = request.params.id_curso;
    const listDisciplina = new ListDiscplinaService();

    const disciplinas = await listDisciplina.listarPorCurso(fk_id_curso);

    return response.json(disciplinas)
  }

  public async deletaDisciplina(request: Request, response: Response): Promise<Response> {
    const id_disciplina = request.params.id_disciplina;
    const deletaDisciplina = new DeleteDisciplina();

    if (!id_disciplina) {
      return response.status(400).json({
        status: 'error',
        message: 'É obrigatório informar o id_disciplina.',
      });
    }

    const disciplina = await deletaDisciplina.deleta(id_disciplina);

    return response.json(disciplina)
  }

}
