import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import QuestaoMarcadores from '@modules/typeorm/entities/QuestaoMarcadores';
import QuestaoMarcadoresRepository from '@modules/typeorm/repositories/QuestaoMarcadoresRepository';
import QuestaoRepository from '@modules/typeorm/repositories/QuestaoRepository';

interface IRequest {
  fk_id_questao: string;
  marcador: string;
}

class CreateMarcadorService {
  public async execute({ fk_id_questao, marcador}: IRequest): Promise<QuestaoMarcadores> {
    const vMarcadoresRepository = getCustomRepository(QuestaoMarcadoresRepository);
    const vQuestaoRepository = getCustomRepository(QuestaoRepository);

    const vQuestao = await vQuestaoRepository.findById(fk_id_questao);

    if (!vQuestao){
      throw new AppError('Questão não encontrada.');
    }

    const vmarcador = vMarcadoresRepository.create({
      fk_id_questao: vQuestao,
      marcador,
    });

    await vMarcadoresRepository.save(vmarcador);

    return vmarcador;

  }
}

export default CreateMarcadorService;
