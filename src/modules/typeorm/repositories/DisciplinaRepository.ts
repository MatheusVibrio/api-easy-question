import { EntityRepository, Repository } from "typeorm";
import Disciplina from "../entities/Disciplina";

@EntityRepository(Disciplina)
class DisciplinaRepository extends Repository<Disciplina> {
  public async findById(id_disciplina: string): Promise<Disciplina | undefined> {
    const disciplina = await this.findOne({
      where: {
        id_disciplina,
      },
    });

    return disciplina;
  }

  // Método para listar todas as disciplinas
  public async findAll(): Promise<Disciplina[]> {
    const disciplinas = await this.find(); // Retorna todas as disciplinas
    return disciplinas;
  }

  public async findByCurso(fk_id_curso: string): Promise<Disciplina[]> {
  const disciplinas = await this.find({
    where: {
      fk_id_curso,
    },
  });

  return disciplinas;
}
}

export default DisciplinaRepository;
