import { EntityRepository, Repository } from "typeorm";
import QuestaoMarcadores from "../entities/QuestaoMarcadores";


@EntityRepository(QuestaoMarcadores)
class QuestaoMarcadoresRepository extends Repository<QuestaoMarcadores>{
public async findByMarcador(pmarcador: string): Promise<QuestaoMarcadores[]> {
  const marcadores = await this.find({
    where: {
      marcador: pmarcador,
    },
  });

  return marcadores;
}

}

export default QuestaoMarcadoresRepository;
