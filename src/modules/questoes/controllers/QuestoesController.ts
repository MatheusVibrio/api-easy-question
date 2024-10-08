import { Request, Response} from 'express';
import ListQuestao from "../services/ListQuestaoService";
import CreateQuestaoService from '../services/CreateQuestaoService';
import CreateMarcadorService from '../services/CreateMarcadorService';
import CreateRespostaService from '../services/CreateRespostaService';
import DeleteQuestion from '../services/DeleteQuestion';
import UpdateQuestaoService from '../services/UpdateQuestaoService';

export default class QuestoesController {
  public async aprovadas(request: Request, response: Response): Promise<Response> {
    const listQuestion = new ListQuestao();

    const aprovadas = await listQuestion.procuraAprovadas();

    return response.json(aprovadas)
  }

  public async questoesUser(request: Request, response: Response): Promise<Response> {
    const id_user = request.params.id_user;
    const listQuestion = new ListQuestao();

    if (!id_user) {
      return response.status(400).json({
        status: 'error',
        message: 'É obrigatório informar o id_user.',
      });
    }

    const totalUsuario = await listQuestion.procuraPorUsuario(id_user);

    return response.json(totalUsuario)
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {enunciado, fk_tipo, fk_id_usuario, fk_id_dificuldade, fk_id_disciplina} = request.body;

    const createUser = new CreateQuestaoService()

    const question = await createUser.execute({
      enunciado,
      fg_aprovada: 'A',
      fk_tipo,
      fk_id_usuario,
      fk_id_dificuldade,
      fk_id_disciplina,
    });

    return response.json(question);
  }

  public async marcadores(request: Request, response: Response): Promise<Response> {
    const {fk_id_questao, marcador} = request.body;

    const createMarcador = new CreateMarcadorService()

    const vmarcador = await createMarcador.execute({
      fk_id_questao,
      marcador,
    });

    return response.json(vmarcador);
  }

  public async respostas(request: Request, response: Response): Promise<Response> {
    const {descricao, fg_correta, fk_id_questao} = request.body;

    const createResposta = new CreateRespostaService()

    const vresposta = await createResposta.execute({
      descricao,
      fg_correta,
      fk_id_questao,
    });

    return response.json(vresposta);
  }

  public async minhasQuestoes(request: Request, response: Response): Promise<Response> {
    const id_user = request.params.id_user;
    const listQuestion = new ListQuestao();

    if (!id_user) {
      return response.status(400).json({
        status: 'error',
        message: 'É obrigatório informar o id_user.',
      });
    }

    const questoes = await listQuestion.listaQuestoes(id_user);

    return response.json(questoes)
  }

   public async minhasQuestoesReprovadas(request: Request, response: Response): Promise<Response> {
    const id_user = request.params.id_user;
    const listQuestion = new ListQuestao();

    if (!id_user) {
      return response.status(400).json({
        status: 'error',
        message: 'É obrigatório informar o id_user.',
      });
    }

    const questoes = await listQuestion.listaQuestoesReprovadas(id_user);

    return response.json(questoes)
  }

  public async minhasQuestoesAnalise(request: Request, response: Response): Promise<Response> {
    const id_user = request.params.id_user;
    const listQuestion = new ListQuestao();

    if (!id_user) {
      return response.status(400).json({
        status: 'error',
        message: 'É obrigatório informar o id_user.',
      });
    }

    const questoes = await listQuestion.listaQuestoesAnalise(id_user);

    return response.json(questoes)
  }

  public async minhasQuestoesAprovadas(request: Request, response: Response): Promise<Response> {
    const id_user = request.params.id_user;
    const listQuestion = new ListQuestao();

    if (!id_user) {
      return response.status(400).json({
        status: 'error',
        message: 'É obrigatório informar o id_user.',
      });
    }

    const questoes = await listQuestion.listaQuestoesAprovadas(id_user);

    return response.json(questoes)
  }

  public async detalhesQuestoes(request: Request, response: Response): Promise<Response> {
    const id_questao = request.params.id_questao;
    const listQuestion = new ListQuestao();

    if (!id_questao) {
      return response.status(400).json({
        status: 'error',
        message: 'É obrigatório informar o id_questao.',
      });
    }

    const questao = await listQuestion.listaDetalhes(id_questao);

    return response.json(questao)
  }

  public async deletaQuestao(request: Request, response: Response): Promise<Response> {
    const id_questao = request.params.id_questao;
    const deletaQuestao = new DeleteQuestion();

    if (!id_questao) {
      return response.status(400).json({
        status: 'error',
        message: 'É obrigatório informar o id_questao.',
      });
    }

    const questoes = await deletaQuestao.deleta(id_questao);

    return response.json(questoes)
  }

   public async update(request: Request, response: Response): Promise<Response> {
    const { fg_aprovada, id_questao, comentario} = request.body;

    try {
      const updateQuestion = new UpdateQuestaoService();
      const updatedQuestion = await updateQuestion.execute({
        fg_aprovada,
        id_questao,
        comentario,
      });

      return response.json(updatedQuestion);
    } catch (error) {
      console.error('Erro ao atualizar a questão:', error);
      return response.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  }


}
