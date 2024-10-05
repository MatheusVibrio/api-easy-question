import { getCustomRepository } from 'typeorm';
import Prova from '@modules/typeorm/entities/Prova';
import ProvaRepository from '@modules/typeorm/repositories/ProvaRepository';

class DeleteProvaService {
 public async deleteProva(id_prova: string): Promise<boolean>  {
  const vProva = getCustomRepository(ProvaRepository);

  const isDeleted = await vProva.provaDelete(id_prova);

  return isDeleted;
}

}

export default DeleteProvaService;
