import Curso from "@modules/typeorm/entities/Curso";
import CursoRepository from "@modules/typeorm/repositories/CursoRepository";
import { getCustomRepository } from "typeorm";

class ListCursoService {
    public async listarTodas(): Promise<Curso[]> {
      const cursoRepository = getCustomRepository(CursoRepository);

      const cursos = cursoRepository.findAll();

      return cursos;
    }

    public async listarPorUser(id_usuario: string): Promise<Curso[]> {
      const cursoRepository = getCustomRepository(CursoRepository);

      const cursos = cursoRepository.findByUser(id_usuario);

      return cursos;
    }

}

export default ListCursoService;
