import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepository'

interface IRequest {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
}

class CreateUserService {
  public async execute({ nome, email, senha, telefone}: IRequest): Promise<Usuario> {
    const UserRepository = getCustomRepository(UsersRepository);
    const emailExists = await UserRepository.findByEmail(email);

    if (emailExists){
      throw new AppError('Email já cadastrado.');
    }

    const user = UserRepository.create({
      nome,
      email,
      senha,
      telefone,
    });

    await UserRepository.save(user);

    return user;

  }
}

export default CreateUserService;
