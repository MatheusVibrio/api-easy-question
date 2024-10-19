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

  public async findByUser(id_usuario: string): Promise<Curso[]> {
    const query = `
      SELECT cs.*
      FROM curso cs
      INNER JOIN usuarios us ON (us.fk_id_curso = cs.id_curso)
      WHERE us.id_usuario = $1
    `;

    const result = await this.query(query, [id_usuario]);

    return result;
  }

}

export default CursoRepository;
