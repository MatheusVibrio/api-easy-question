import { EntityRepository, Repository } from "typeorm";
import UserTipo from "../entities/UserTipo";

@EntityRepository(UserTipo)
class UsuarioTipoRepository extends Repository<UserTipo>{
  public async findById(id_tipo: string): Promise<UserTipo | undefined> {
  const tipo = await this.findOne({
      where: {
        id_tipo,
      },
    });

  return tipo;
}
}

export default UsuarioTipoRepository;
