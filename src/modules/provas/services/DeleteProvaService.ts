import { getCustomRepository } from 'typeorm';
import Prova from '@modules/typeorm/entities/Prova';
import ProvaRepository from '@modules/typeorm/repositories/ProvaRepository';
import ProvaQuestaoRepository from '@modules/typeorm/repositories/ProvaQuestaoRepository';

class DeleteProvaService {
  public async deleteProva(id_prova: string): Promise<boolean>  {
    const vProva = getCustomRepository(ProvaRepository);

    const isDeleted = await vProva.provaDelete(id_prova);

    return isDeleted;
  }

  public async deletaQuestionProva(id_lcto: string): Promise<boolean> {
    const vProva = getCustomRepository(ProvaQuestaoRepository);

    // Convertemos o id_lcto para número
    let idNumber = parseInt(id_lcto, 10);

    // Deletamos o registro pelo id_lcto convertido
    const result = await vProva.delete(idNumber);

    // Verificamos se algum registro foi deletado
    return result.affected !== 0;
  }


}

export default DeleteProvaService;
