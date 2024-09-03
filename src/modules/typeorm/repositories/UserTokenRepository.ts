import { EntityRepository, Repository } from "typeorm";
import UsuarioToken from "../entities/UsuarioToken";

@EntityRepository(UsuarioToken)
class UserTokenRepository extends Repository<UsuarioToken>{
  public async findByToken(token: string): Promise<UsuarioToken | undefined> {
    const userToken = await this.findOne({
      where: {
        token,
      },
    });

    return userToken;
  }

  public async generate(fk_usuario: string): Promise<UsuarioToken | undefined> {
    const userToken = await this.create({
      fk_usuario,
    });

    await this.save(userToken)

    return userToken;
  }
}

export default UserTokenRepository;
