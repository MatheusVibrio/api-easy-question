import { EntityRepository, Repository } from "typeorm";
import Disciplina from "../entities/Disciplina";


@EntityRepository(Disciplina)
class DisciplinaRepository extends Repository<Disciplina>{
  public async findById(id_disciplina: string): Promise<Disciplina | undefined> {
  const disciplina = await this.findOne({
      where: {
        id_disciplina,
      },
    });

  return disciplina;
}
}

export default DisciplinaRepository;
