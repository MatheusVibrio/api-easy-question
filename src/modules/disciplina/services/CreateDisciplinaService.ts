import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import DisciplinaRepository from '@modules/typeorm/repositories/DisciplinaRepository';
import Disciplina from '@modules/typeorm/entities/Disciplina';
import CursoRepository from '@modules/typeorm/repositories/CursoRepository';

interface IRequest {
  descricao: string;
  fk_id_curso: string;
}

class CreateDisciplinaService {
  public async  execute({ descricao, fk_id_curso}: IRequest): Promise<Disciplina> {
    const vDisciplinaRepository = getCustomRepository(DisciplinaRepository);
    const vCursoRepository = getCustomRepository(CursoRepository);

    const vCurso = await vCursoRepository.findById(fk_id_curso);

    if (!vCurso){
      throw new AppError('Curso não encontrada.');
    }

    const vdisciplina = vDisciplinaRepository.create({
      descricao,
      fk_id_curso: vCurso,
    });

    await vDisciplinaRepository.save(vdisciplina);

    return vdisciplina;

  }
}

export default CreateDisciplinaService;
