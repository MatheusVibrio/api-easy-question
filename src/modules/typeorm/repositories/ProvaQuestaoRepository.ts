import { EntityRepository, Repository } from "typeorm";
import ProvaQuestao from "../entities/ProvaQuestao";

@EntityRepository(ProvaQuestao)
class ProvaQuestaoRepository extends Repository<ProvaQuestao> {
  // Método para verificar se há questões relacionadas ao id_questao
  public async findByQuestaoId(id_questao: string): Promise<ProvaQuestao[]> {
    const questoesRelacionadas = await this.find({
      where: {
        fk_id_questao: id_questao,
      },
    });

    return questoesRelacionadas;
  }
}

export default ProvaQuestaoRepository;
