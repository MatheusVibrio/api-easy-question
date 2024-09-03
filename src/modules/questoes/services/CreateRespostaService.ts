import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import QuestaoRepository from '@modules/typeorm/repositories/QuestaoRepository';
import QuestaoResposta from '@modules/typeorm/entities/QuestaoResposta';
import QuestaoRespostaRepository from '@modules/typeorm/repositories/QuestaoRespostaRepository';

interface IRequest {
  descricao: string;
  fg_correta: string;
  fk_id_questao: string;
}

class CreateRespostaService {
  public async execute({ descricao, fg_correta, fk_id_questao}: IRequest): Promise<QuestaoResposta> {
    const vRespostaRepository = getCustomRepository(QuestaoRespostaRepository);
    const vQuestaoRepository = getCustomRepository(QuestaoRepository);

    const vQuestao = await vQuestaoRepository.findById(fk_id_questao);

    if (!vQuestao){
      throw new AppError('Questão não encontrada.');
    }

    const vresposta = vRespostaRepository.create({
      descricao,
      fg_correta,
      fk_id_questao: vQuestao,
    });

    await vRespostaRepository.save(vresposta);

    return vresposta;

  }
}

export default CreateRespostaService;
