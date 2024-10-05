import Curso from "@modules/typeorm/entities/Curso";
import CursoRepository from "@modules/typeorm/repositories/CursoRepository";
import { getCustomRepository } from "typeorm";

class ListCursoService {
    public async listarTodas(): Promise<Curso[]> {
      const cursoRepository = getCustomRepository(CursoRepository);

      const cursos = cursoRepository.findAll();

      return cursos;
    }

}

export default ListCursoService;
