import { EntityRepository, Repository } from "typeorm";
import QuestaoTipo from "../entities/QuestaoTipo";


@EntityRepository(QuestaoTipo)
class QuestaoTipoRepository extends Repository<QuestaoTipo>{
  public async findById(id_tipo: string): Promise<QuestaoTipo | undefined> {
  const tipo = await this.findOne({
      where: {
        id_tipo,
      },
    });

  return tipo;
}
}

export default QuestaoTipoRepository;
