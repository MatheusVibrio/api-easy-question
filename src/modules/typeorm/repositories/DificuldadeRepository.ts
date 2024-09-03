import { EntityRepository, Repository } from "typeorm";
import QuestaoDificuldade from "../entities/QuestaoDificuldade";

@EntityRepository(QuestaoDificuldade)
class DificuldadeRepository extends Repository<QuestaoDificuldade>{
  public async findById(id_dificuldade: string): Promise<QuestaoDificuldade | undefined> {
  const dificuldade = await this.findOne({
      where: {
        id_dificuldade,
      },
    });

  return dificuldade;
}
}

export default DificuldadeRepository;
