import { Request, Response} from 'express';
import ListQuestao from "../services/ListQuestaoService";

export default class QuestoesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUser = new ListQuestao();

    const users = await listUser.execute();

    return response.json(users)
  }

}
