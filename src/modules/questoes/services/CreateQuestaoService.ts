import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Usuario from '../../typeorm/entities/User';
import UsersRepository from '../../typeorm/repositories/UserRepository'
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth'

interface IRequest {
  email: string;
  senha: string;
}

interface IResponse {
  user: Usuario,
  token: String;
}

class CreateSessionsService {
  public async execute({email, senha}: IRequest): Promise<IResponse> {
    const UserRepository = getCustomRepository(UsersRepository);
    // Achando email
    const user = await UserRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Email ou senha incorreto(s).',401);
    }

    // Comparando a senha encriptografada com a digitada
    const senhaConfirmado = await compare(senha, user.senha)

    if (!senhaConfirmado) {
      throw new AppError('Email ou senha incorreto(s).',401);
    }

    // No campo subject ele irá retornar o id do usuário para facilitar no front-end
    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id_usuario,
      expiresIn: authConfig.jwt.expiresIn,
    })

    return {
      user,
      token,
    };
  }
}

export default CreateSessionsService;
