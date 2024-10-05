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

  // Método para listar todos os cursos
  public async findAll(): Promise<Curso[]> {
    const cursos = await this.find();
    return cursos;
  }
}

export default CursoRepository;
