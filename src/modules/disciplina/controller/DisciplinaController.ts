import { Request, Response} from 'express';
import CreateDisciplinaService from '../services/CreateDisciplinaService';
import ListDiscplinaService from '../services/ListDisciplinaService';
import DeleteDisciplina from '../services/DeleteDisciplina';
import UpdateDisciplinaService from '../services/UpdateDisciplinaService';
import ListQuestaoService from '@modules/questoes/services/ListQuestaoService';

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

   public async listById(request: Request, response: Response): Promise<Response> {
    const id_disciplina = request.params.id_disciplina;
    const listDisciplina = new ListDiscplinaService();

    const disciplinas = await listDisciplina.listarPorId(id_disciplina);

    return response.json(disciplinas)
  }

  public async deletaDisciplina(request: Request, response: Response): Promise<Response> {
    const id_disciplina = request.params.id_disciplina;
    const deletaDisciplina = new DeleteDisciplina();
    const listByDisciplina = new ListQuestaoService();

    if (!id_disciplina) {
      return response.status(400).json({
        status: 'error',
        message: 'É obrigatório informar o id_disciplina.',
      });
    }

    const numDisciplinas = await listByDisciplina.listByDisciplina(id_disciplina);

    if (numDisciplinas > 0) {
      return response.status(400).json({
        status: 'error',
        message: 'Disciplina vinculada a uma questão',
      });
    }

    const disciplina = await deletaDisciplina.deleta(id_disciplina);

    return response.json(disciplina)
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id_disciplina, descricao, fk_id_curso} = request.body;

    try {
      const updateDisciplina = new UpdateDisciplinaService();
      const updatedDisciplina = await updateDisciplina.execute({
        id_disciplina,
        descricao,
        fk_id_curso,
      });

      return response.json(updatedDisciplina);
    } catch (error) {
      console.error('Erro ao atualizar disciplina:', error);
      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }

}
