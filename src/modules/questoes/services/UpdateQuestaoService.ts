import { getCustomRepository } from 'typeorm';
import Questao from '../../typeorm/entities/Questao';
import QuestaoRepository from '@modules/typeorm/repositories/QuestaoRepository';

interface IRequest {
  fg_aprovada: string; // Assumindo que seja 'S' ou 'N', ou um valor semelhante
  id_questao: string;
  comentario: string;
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
}

export default UpdateQuestaoService;
