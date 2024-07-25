import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';

interface IRequest {
  email: string;
}

class ForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const user = await userRepository.findByEmail(email);

    if(!user){
      throw new AppError('Usuário não existente.');
    }

    const token = await userTokenRepository.generate(user.id_usuario);

    console.log(token);
  }
}

export default ForgotPasswordEmailService;
