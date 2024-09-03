import { EntityRepository, Repository } from "typeorm";
import Questao from "../entities/Questao";

@EntityRepository(Questao)
class QuestaoRepository extends Repository<Questao>{
  public async countAprovadas(): Promise<number> {
  const count = await this.count({
    where: {
      fg_aprovada: 'S',
    },
  });

  return count;
}

public async countPorUsuario(id_user: string): Promise<number> {
  const count = await this.count({
    where: {
      fk_id_usuario: id_user,
    },
  });

  return count;
}

public async findById(id_questao: string): Promise<Questao | undefined> {
  const tipo = await this.findOne({
      where: {
        id_questao,
      },
    });

  return tipo;
}
}

export default QuestaoRepository;
