import { getCustomRepository } from 'typeorm';
import Questao from '../../typeorm/entities/Questao';
import QuestaoRepository from '../../typeorm/repositories/QuestaoRepository';
import ProvaQuestaoRepository from '@modules/typeorm/repositories/ProvaQuestaoRepository';

class DeleteQuestion {
 public async deleta(id_questao: string): Promise<Questao | undefined>  {
  const questionsRepository = getCustomRepository(QuestaoRepository);
  const provaQuestaoRepository = getCustomRepository(ProvaQuestaoRepository);

  // Verifica se a questão está associada a alguma prova
  const questoesRelacionadas = await provaQuestaoRepository.findByQuestaoId(id_questao);

  if (questoesRelacionadas.length > 0) {
    throw new Error('Não é possível deletar a questão, pois ela está associada a uma prova.');
  }

  const question = await questionsRepository.deleteQuestion(id_questao);

  return question;
}


}

export default DeleteQuestion;
