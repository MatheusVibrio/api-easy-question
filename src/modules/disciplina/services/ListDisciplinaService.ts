import Disciplina from "@modules/typeorm/entities/Disciplina";
import DisciplinaRepository from "@modules/typeorm/repositories/DisciplinaRepository";
import { getCustomRepository } from "typeorm";

class ListDiscplinaService {
    public async listarTodas(): Promise<Disciplina[]> {
      const disciplinaRepository = getCustomRepository(DisciplinaRepository);

      const discplinas = disciplinaRepository.findAll();

      return discplinas;
    }

      public async listarPorCurso(id_curso: string): Promise<Disciplina[]> {
      const disciplinaRepository = getCustomRepository(DisciplinaRepository);

      const discplinas = disciplinaRepository.findByCurso(id_curso);

      return discplinas;
    }

}

export default ListDiscplinaService;
