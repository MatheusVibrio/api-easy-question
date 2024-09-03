import { EntityRepository, Repository } from "typeorm";
import Questao from "../entities/Questao";

@EntityRepository(Questao)
class QuestaoRepository extends Repository<Questao>{
  public async findByAprovadas(name: string): Promise<Questao | undefined> {
    const questions = await this.findOne({
      where: {
        name,
      },
    });

    return questions;
  }
}

export default QuestaoRepository;
