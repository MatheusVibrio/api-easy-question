import { getCustomRepository } from 'typeorm';
import Questao from '../../typeorm/entities/Questao';
import QuestaoRepository from '@modules/typeorm/repositories/QuestaoRepository';
import QuestaoRespostaRepository from '@modules/typeorm/repositories/QuestaoRespostaRepository';
import QuestaoMarcadoresRepository from '@modules/typeorm/repositories/QuestaoMarcadoresRepository';
import DisciplinaRepository from '@modules/typeorm/repositories/DisciplinaRepository';
import DificuldadeRepository from '@modules/typeorm/repositories/DificuldadeRepository';

interface IRequest {
  fg_aprovada: string; // Assumindo que seja 'S' ou 'N', ou um valor semelhante
  id_questao: string;
  comentario: string;
}

interface IQuestionRequest {
  id_questao: string; // Assumindo que seja 'S' ou 'N', ou um valor semelhante
  questao: string;
  fk_id_disciplina: string;
  fk_id_dificuldade: string;
  marcadores: string;
  respostas: string;
}

class UpdateQuestaoService {
  public async execute({ fg_aprovada, id_questao, comentario }: IRequest): Promise<Questao> {
    const questaoRepository = getCustomRepository(QuestaoRepository);

    // Encontrar a questão pelo id_questao
    const questao = await questaoRepository.findOne({ where: { id_questao } });

    if (!questao) {
      throw new Error('Questão não encontrada'); // Caso a questão não seja encontrada
    }

    // Atualiza o campo fg_aprovada
    questao.fg_aprovada = fg_aprovada;

    if (comentario != ''){
      questao.comentario = comentario;
    }

    // Salva as alterações no banco de dados
    await questaoRepository.save(questao);

    return questao;  // Retorna a questão atualizada
  }

  public async updateQuestion({ id_questao, questao, fk_id_disciplina, fk_id_dificuldade, marcadores, respostas }: IQuestionRequest): Promise<Response> {
    const questionsRepository = getCustomRepository(QuestaoRepository);
    const marcadoresRepository = getCustomRepository(QuestaoMarcadoresRepository);
    const respostasRepository = getCustomRepository(QuestaoRespostaRepository);
    const disciplinaRepository = getCustomRepository(DisciplinaRepository);
    const dificuldadeRepository = getCustomRepository(DificuldadeRepository);

    // Verifica se a questão existe
    const questaoExistente = await questionsRepository.findOne(id_questao);
    if (!questaoExistente) {
      throw new Error('Questão não encontrada');
    }

    // Verifica se a disciplina existe
    const disciplinaExistente = await disciplinaRepository.findOne({ where: { id_disciplina: fk_id_disciplina } });
    if (!disciplinaExistente) {
      throw new Error('Disciplina não encontrada');
    }

    // Verifica se a dificuldade existe
    const dificuldadeExistente = await dificuldadeRepository.findOne({ where: { id_dificuldade: fk_id_dificuldade } });
    if (!dificuldadeExistente) {
      throw new Error('Dificuldade não encontrada');
    }

    // Atualiza os campos da questão
    questaoExistente.enunciado = questao;
    questaoExistente.fk_id_disciplina = disciplinaExistente
    questaoExistente.fk_id_dificuldade = dificuldadeExistente
    questaoExistente.fg_aprovada = 'A'

    // Atualiza os marcadores (remove os antigos e insere os novos)
    if (Array.isArray(marcadores)) {
      const antigosMarcadores = await marcadoresRepository.find({ where: { fk_id_questao: id_questao } });
      await marcadoresRepository.remove(antigosMarcadores);

    const novosMarcadores = marcadores.map((marcador: string) => {
    return marcadoresRepository.create({
      fk_id_questao: questaoExistente,
      marcador: marcador,
      });
    });


      await marcadoresRepository.save(novosMarcadores);
    } else {
      throw new Error('Marcadores deve ser uma lista de strings.');
    }

    // Atualiza as respostas (remove as antigas e insere as novas)
    const antigasRespostas = await respostasRepository.find({ where: { fk_id_questao: id_questao } });
    await respostasRepository.remove(antigasRespostas);

    if (!Array.isArray(respostas)) {
    throw new Error('Respostas deve ser um array');
    }

    const novasRespostas = respostas.map((resposta: any) => {
      return respostasRepository.create({
        descricao: resposta.resposta,
        fg_correta: resposta.correta,
        fk_id_questao: questaoExistente,
      });
    });

    await respostasRepository.save(novasRespostas);

    // Salva as alterações na questão
    await questionsRepository.save(questaoExistente);

    return Response.json(questaoExistente);
}
}

export default UpdateQuestaoService;
