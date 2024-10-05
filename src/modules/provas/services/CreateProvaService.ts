import { getCustomRepository } from 'typeorm';
import QuestaoRepository from '@modules/typeorm/repositories/QuestaoRepository';
import AppError from '@shared/errors/AppError';
import UsersRepository from '@modules/typeorm/repositories/UserRepository';
import DisciplinaRepository from '@modules/typeorm/repositories/DisciplinaRepository';
import Prova from '@modules/typeorm/entities/Prova';
import ProvaRepository from '@modules/typeorm/repositories/ProvaRepository';
import ProvaQuestaoRepository from '@modules/typeorm/repositories/ProvaQuestaoRepository';
import ProvaQuestao from '@modules/typeorm/entities/ProvaQuestao';

interface IRequest {
  descricao: string;
  fk_id_disciplina: string;
  fk_id_usuario: string;
}

interface IResposta {
    ordem: number;
    fk_id_questao: number;
    fk_id_prova: number;
}

class CreateProvaService {
  public async execute({ descricao, fk_id_disciplina, fk_id_usuario}: IRequest): Promise<Prova> {
    const vProva = getCustomRepository(ProvaRepository)
    const vUser = getCustomRepository(UsersRepository);
    const vDisciplina = getCustomRepository(DisciplinaRepository);

    const user = await vUser.findByid(fk_id_usuario);
    const disciplina = await vDisciplina.findById(fk_id_disciplina);

     if (!user){
      throw new AppError('Usuário não encontrado.');
    }

    if (!disciplina){
      throw new AppError('Disciplina não encontrada.');
    }

    const prova = vProva.create({
      descricao,
      fk_id_disciplina: disciplina,
      fk_id_usuario: user,
    });

    await vProva.save(prova);

    return prova;
  }

  public async executeQuestoes(respostas: IResposta[]): Promise<ProvaQuestao[]> {
    const vProvaQuestao = getCustomRepository(ProvaQuestaoRepository)
    const vProva = getCustomRepository(ProvaRepository);
    const vQuestao = getCustomRepository(QuestaoRepository); // Se você precisar de questões

    const provas: ProvaQuestao[] = []; // Para armazenar as provas criadas

    for (const resposta of respostas) {
        const { ordem, fk_id_questao, fk_id_prova } = resposta;

        // Aqui você precisará passar o ID do usuário e da disciplina, que pode vir de outro lugar
        const prova = await vProva.findById(fk_id_prova.toString()); // Convertendo para string
        const questao = await vQuestao.findById(fk_id_questao.toString()); // Verifica se a questão existe

        if (!prova) {
            throw new AppError('Prova não encontrada.');
        }

        if (!questao) {
            throw new AppError('Questão não encontrada.'); // Verifica se a questão existe
        }

        const provaQuestao = vProvaQuestao.create({
            ordem, // Adiciona a ordem
            fk_id_questao: questao, // Presumindo que você tenha uma relação aqui
            fk_id_prova: prova, // Preservando o ID da prova
        });

        await vProvaQuestao.save(provaQuestao);
        provas.push(provaQuestao); // Adiciona a prova criada ao array
    }

    return provas; // Retorna todas as provas criadas
}
}

export default CreateProvaService;
