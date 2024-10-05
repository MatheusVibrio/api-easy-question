import { Request, Response} from 'express';
import ListProvaService from '../services/ListProvaService';
import CreateProvaService from '../services/CreateProvaService';
import DeleteProvaService from '../services/DeleteProvaService';


export default class ProvaController {
  public async list(request: Request, response: Response): Promise<Response> {
    const id_usuario = request.params.id_user
    const listProva = new ListProvaService();

    const provas = await listProva.listarTodas(id_usuario);

    return response.json(provas)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {descricao, fk_id_disciplina, fk_id_usuario} = request.body;

    const createProva = new CreateProvaService()

    const prova = await createProva.execute({
      descricao,
      fk_id_disciplina,
      fk_id_usuario,
    });

    return response.json(prova);
  }

  public async createQuestoes(request: Request, response: Response): Promise<Response> {
    const respostas = request.body; // Espera-se que seja uma lista de questoes

    const createQuestoes = new CreateProvaService();

    // Passa a lista de respostas para o método executeQuestoes
    const questoes = await createQuestoes.executeQuestoes(respostas);

    return response.status(201).json(questoes); // Retorna todas as provas criadas
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const id_prova = request.params.id_prova

    const deletaProva = new DeleteProvaService();

    // Passa a lista de respostas para o método executeQuestoes
    const prova = await deletaProva.deleteProva(id_prova);

    return response.json(prova);
  }
}
