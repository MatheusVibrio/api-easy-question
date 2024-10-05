import { Request, Response} from 'express';
import ListCursoService from '../services/ListCursoService';


export default class CursoController {
  public async list(request: Request, response: Response): Promise<Response> {
    const listCurso = new ListCursoService();

    const cursos = await listCurso.listarTodas();

    return response.json(cursos)
  }

}
