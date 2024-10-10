import Prova from "@modules/typeorm/entities/Prova";
import ProvaRepository from "@modules/typeorm/repositories/ProvaRepository";
import { getCustomRepository } from "typeorm";

class ListProvaService {
    public async listarTodas(id_usuario: string): Promise<Prova[]> {
      const provaRepository = getCustomRepository(ProvaRepository);

      const provas = provaRepository.findByIdUser(id_usuario);

      return provas;
    }

    public async listarTodasSistema(): Promise<number> {
      const provaRepository = getCustomRepository(ProvaRepository);
      const count = await provaRepository.count();

      return count;
    }

}

export default ListProvaService;
