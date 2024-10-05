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
  isSupervisor: boolean;
}

class CreateSessionsService {
  public async execute({ email, senha }: IRequest): Promise<IResponse> {
    const UserRepository = getCustomRepository(UsersRepository);

    // Achando email e carregando o relacionamento fk_id_tipo
    const user = await UserRepository.findOne({
        where: { email },
        relations: ['fk_id_tipo'], // Carregando a relação com UserTipo
    });

    if (!user) {
        throw new AppError('Email ou senha incorreto(s).', 401);
    }

    // Comparando a senha encriptografada com a digitada
    const senhaConfirmado = await compare(senha, user.senha);

    if (!senhaConfirmado) {
        throw new AppError('Email ou senha incorreto(s).', 401);
    }

    // Verificando se o usuário é supervisor com base no fg_supervisor
    const isSupervisor = user.fk_id_tipo && user.fk_id_tipo.fg_supervisor === 'S';

    // Gerando o token
    const token = sign({}, authConfig.jwt.secret, {
        subject: user.id_usuario.toString(),
        expiresIn: authConfig.jwt.expiresIn,
    });

    return {
        user,
        token,
        isSupervisor,
    };
}


}

export default CreateSessionsService;
