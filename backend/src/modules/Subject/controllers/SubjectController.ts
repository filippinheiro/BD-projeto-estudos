import { Response, Request } from 'express';
import ListSubjectService from '../services/ListSubjectService';

export default class SubjectController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSubjects = new ListSubjectService(request.client);

    const subjects = await listSubjects.execute();

    return response.json(subjects);
  }
}
