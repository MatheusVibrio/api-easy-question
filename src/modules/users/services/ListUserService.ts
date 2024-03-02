import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepository';

class ListUserService {
  public async execute(): Promise<Usuario[]> {
    const usersRepository = getCustomRepository(UsersRepository);

    const users = usersRepository.find();

    return users;
  }
}

export default ListUserService;
