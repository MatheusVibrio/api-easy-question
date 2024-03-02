import AppError from "@shared/errors/AppError";
import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { func } from 'joi';
import authConfig from '@config/auth'

interface ITokenPayLoad{
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token não encontrado');
  }

  // Pegando o token para verificar se ele foi gerado por nossa aplicação
  const [, token] = authHeader.split(' ');

  try {
    // Caso ache o token ele irá seguir em frente, caso não ache irá gerar um erro
    const decodeToken = verify(token, authConfig.jwt.secret);

    const { sub } = decodeToken as ITokenPayLoad;

    request.user = {
      id: sub,
    }

    return next();
  } catch {
    throw new AppError('JWT Token inválido.')
  }
}
