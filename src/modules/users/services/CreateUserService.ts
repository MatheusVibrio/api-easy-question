import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Usuario from '../../typeorm/entities/User';
import UsersRepository from '../../typeorm/repositories/UserRepository'
import { hash } from 'bcryptjs';
import UsuarioTipoRepository from '@modules/typeorm/repositories/UsuarioTipoRepository';

interface IRequest {
  nome: string;
  email: string;
  senha: string;
  telefone: string;
  fg_primeiro_acesso: string;
  fk_id_tipo: string;
}

class CreateUserService {
  public async execute({ nome, email, senha, telefone, fk_id_tipo}: IRequest): Promise<Usuario> {
    const UserRepository = getCustomRepository(UsersRepository);
    const emailExists = await UserRepository.findByEmail(email);
    const vUserTipo = getCustomRepository(UsuarioTipoRepository);
    const tipo = await vUserTipo.findById(fk_id_tipo);

    if (emailExists){
      throw new AppError('Email já cadastrado.');
    }

    if (!tipo){
      throw new AppError('Tipo de usuário não encontrado.');
    }

    // Encriptografando a senha
    const hashedPassword = await hash(senha,8)
    const user = UserRepository.create({
      nome,
      email,
      senha: hashedPassword,
      telefone,
      fg_primeiro_acesso: 'S',
      fk_id_tipo: tipo,
    });

    await UserRepository.save(user);

    return user;

  }
}

export default CreateUserService;
