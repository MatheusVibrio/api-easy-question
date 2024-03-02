import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Usuario from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UserRepository'
import { hash } from 'bcryptjs';

interface IRequest {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  fg_primeiro_acesso: string;
}

class CreateUserService {
  public async execute({ nome, email, senha, telefone}: IRequest): Promise<Usuario> {
    const UserRepository = getCustomRepository(UsersRepository);
    const emailExists = await UserRepository.findByEmail(email);

    if (emailExists){
      throw new AppError('Email já cadastrado.');
    }

    // Encriptografando a senha
    const hashedPassword = await hash(senha,8)
    const user = UserRepository.create({
      nome,
      email,
      senha: hashedPassword,
      telefone,
      fg_primeiro_acesso: 'S',
    });

    await UserRepository.save(user);

    return user;

  }
}

export default CreateUserService;
