import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs'
import UsersRepository from '../../typeorm/repositories/UserRepository';
import UserTokenRepository from '../../typeorm/repositories/UserTokenRepository';
import {isAfter, addHours} from 'date-fns'

interface IRequest {
  token: string;
  senha: string;
}

class ResetPasswordService {
  public async execute({ token, senha }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if(!userToken){
      throw new AppError('Token inválido, inexistente.');
    }

    const user = await userRepository.findByid(userToken.fk_usuario)

    if(!user){
      throw new AppError('Usuário inexistente.');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);

    if(isAfter(Date.now(), compareDate)){
      throw new AppError('Token expirado!');
    }

    user.senha = await hash(senha, 8);
  }
}

export default ResetPasswordService;
