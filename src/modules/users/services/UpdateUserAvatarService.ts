import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Usuario from '../../typeorm/entities/User';
import UsersRepository from '../../typeorm/repositories/UserRepository';
import path from 'path';
import uploadConfig from '@config/upload';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatarFileName}: IRequest): Promise<Usuario> {
    const UserRepository = getCustomRepository(UsersRepository);

    const user = await UserRepository.findByid(user_id);

    if(!user){
      throw new AppError('Usuários não encontrado.');
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath); // deletando a imagem antiga caso exista
      }
    }

    user.avatar = avatarFileName;

    await UserRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
