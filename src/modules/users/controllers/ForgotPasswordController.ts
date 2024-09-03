import { Request, Response} from 'express';
import ForgotPasswordEmailService from '../services/ForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const sendForgotPassworEmail = new ForgotPasswordEmailService();

    await sendForgotPassworEmail.execute({
      email
    });

    return response.status(204).json();
  }
}
