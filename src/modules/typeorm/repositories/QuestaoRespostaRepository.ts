import { EntityRepository, Repository } from "typeorm";
import QuestaoResposta from "../entities/QuestaoResposta";


@EntityRepository(QuestaoResposta)
class QuestaoRespostaRepository extends Repository<QuestaoResposta>{
public async findById(id_resposta: string): Promise<QuestaoResposta | undefined> {
  const resposta = await this.findOne({
      where: {
        id_resposta,
      },
    });

  return resposta;
}

}

export default QuestaoRespostaRepository;
