import { EntityRepository, Repository } from "typeorm";
import Usuario from "../entities/User";

@EntityRepository(Usuario)
class UsersRepository extends Repository<Usuario>{
  public async findByName(name: string): Promise<Usuario | undefined> {
    const user = await this.findOne({
      where: {
        name,
      },
    });

    return user;
  }

  public async findByid(id_usuario: string): Promise<Usuario | undefined> {
    const user = await this.findOne({
      where: {
        id_usuario,
      },
    });

    return user;
  }

  public async findByEmail(email: string): Promise<Usuario | undefined> {
    const user = await this.findOne({
      where: {
        email,
      },
    });

    return user;
  }
}

export default UsersRepository;
