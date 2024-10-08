import { getCustomRepository } from 'typeorm';
import Disciplina from '@modules/typeorm/entities/Disciplina';
import DisciplinaRepository from '@modules/typeorm/repositories/DisciplinaRepository';

class DeleteDisciplina {
 public async deleta(id_questao: string): Promise<Boolean | undefined>  {
  const disciplinaRepository = getCustomRepository(DisciplinaRepository);

  const disciplina = await disciplinaRepository.deleteDisciplina(id_questao);

  return disciplina;
}
}

export default DeleteDisciplina;
