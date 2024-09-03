import { EntityRepository, Repository } from "typeorm";
import Curso from "../entities/Curso";


@EntityRepository(Curso)
class CursoRepository extends Repository<Curso>{
  public async findById(id_curso: string): Promise<Curso | undefined> {
  const curso = await this.findOne({
      where: {
        id_curso,
      },
    });

  return curso;
}
}

export default CursoRepository;
