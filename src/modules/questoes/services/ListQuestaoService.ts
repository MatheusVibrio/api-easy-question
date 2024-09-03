import { getCustomRepository } from 'typeorm';
import Questao from '../../typeorm/entities/Questao';
import QuestaoRepository from '../../typeorm/repositories/QuestaoRepository';

class ListUserService {
  public async execute(): Promise<Questao | undefined> {
    const questionsRepository = getCustomRepository(QuestaoRepository);

    const questions = questionsRepository.findByAprovadas('teste');

    return questions;
  }
}

export default ListUserService;
