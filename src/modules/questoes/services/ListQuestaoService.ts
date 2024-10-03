import { getCustomRepository } from 'typeorm';
import Questao from '../../typeorm/entities/Questao';
import QuestaoRepository from '../../typeorm/repositories/QuestaoRepository';

class ListUserService {
  public async procuraAprovadas(): Promise<number> {
    const questionsRepository = getCustomRepository(QuestaoRepository);

    const questions = questionsRepository.countAprovadas();

    return questions;
  }

   public async procuraPorUsuario(id_user: string): Promise<number> {
    const questionsRepository = getCustomRepository(QuestaoRepository);

    const questions = questionsRepository.countPorUsuario(id_user);

    return questions;
  }

   public async listaQuestoes(id_user: string): Promise<number> {
    const questionsRepository = getCustomRepository(QuestaoRepository);

    const questions = questionsRepository.listaQuestoesUser(id_user);

    return questions;
  }
}

export default ListUserService;
