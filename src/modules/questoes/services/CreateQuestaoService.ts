import { getCustomRepository } from 'typeorm';
import QuestaoRepository from '@modules/typeorm/repositories/QuestaoRepository';
import AppError from '@shared/errors/AppError';
import UsersRepository from '@modules/typeorm/repositories/UserRepository';
import DificuldadeRepository from '@modules/typeorm/repositories/DificuldadeRepository';
import DisciplinaRepository from '@modules/typeorm/repositories/DisciplinaRepository';
import QuestaoTipoRepository from '@modules/typeorm/repositories/QuestaoTipoRepository';
import Questao from '@modules/typeorm/entities/Questao';

interface IRequest {
  enunciado: string;
  fg_aprovada: string;
  fk_tipo: string;
  fk_id_usuario: string;
  fk_id_dificuldade: string;
  fk_id_disciplina: string;
}

class CreateQuestaoService {
  public async execute({ enunciado, fg_aprovada, fk_tipo, fk_id_usuario, fk_id_dificuldade, fk_id_disciplina}: IRequest): Promise<Questao> {
    const vQuestionRepository = getCustomRepository(QuestaoRepository);
    const vUser = getCustomRepository(UsersRepository);
    const vDificuldade = getCustomRepository(DificuldadeRepository);
    const vDisciplina = getCustomRepository(DisciplinaRepository);
    const vQuestaoTipo = getCustomRepository(QuestaoTipoRepository);


    const tipo = await vQuestaoTipo.findById(fk_tipo);
    const user = await vUser.findByid(fk_id_usuario);
    const dificuldade = await vDificuldade.findById(fk_id_dificuldade);
    const disciplina = await vDisciplina.findById(fk_id_disciplina);

    if (!tipo){
      throw new AppError('Tipo de questão não encontrado.');
    }

    if (!user){
      throw new AppError('Usuário não encontrado.');
    }

    if (!dificuldade){
      throw new AppError('Dificuldade não encontrada.');
    }

    if (!disciplina){
      throw new AppError('Disciplina não encontrada.');
    }

    const question = vQuestionRepository.create({
      enunciado,
      fg_aprovada: 'A',
      fk_tipo: tipo,
      fk_id_usuario: user,
      fk_id_dificuldade: dificuldade,
      fk_id_disciplina: disciplina,
    });

    await vQuestionRepository.save(question);

    return question;

  }
}

export default CreateQuestaoService;
