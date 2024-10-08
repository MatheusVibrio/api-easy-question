import { getCustomRepository } from 'typeorm';
import DisciplinaRepository from '@modules/typeorm/repositories/DisciplinaRepository';
import CursoRepository from '@modules/typeorm/repositories/CursoRepository';
import Disciplina from '@modules/typeorm/entities/Disciplina';

interface IRequest {
  id_disciplina: string; // Assumindo que seja 'S' ou 'N', ou um valor semelhante
  descricao: string;
  fk_id_curso: string;
}

class UpdateDisciplinaService {
public async execute({ id_disciplina, descricao, fk_id_curso }: IRequest): Promise<Disciplina> {
  const disciplinaRepository = getCustomRepository(DisciplinaRepository);
  const cursoRepository = getCustomRepository(CursoRepository);

  const disciplina = await disciplinaRepository.findOne({ where: {id_disciplina: id_disciplina } });
  const curso = await cursoRepository.findOne({ where: { id_curso: fk_id_curso } }); // Corrigido aqui

  if (!curso) {
    throw new Error('Curso não encontrada');
  }

  if (!disciplina) {
    throw new Error('Disciplina não encontrada');
  }

  disciplina.descricao = descricao;
  disciplina.fk_id_curso = curso;

  await disciplinaRepository.save(disciplina);

  return disciplina;
}
}

export default UpdateDisciplinaService;
