import { Response, Request } from 'express';
import CalculateAverageService from '../services/CalculateAverageService';
import ListSubjectService from '../services/ListSubjectService';

export default class SubjectController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSubjects = new ListSubjectService(request.client);

    const subjects = await listSubjects.execute();

    return response.json(subjects);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { idSubject } = request.params;
    const { id } = request.user;

    const calculateAverage = new CalculateAverageService(request.client);

    const average = await calculateAverage.execute({
      idSubject,
      idStudent: id,
    });

    return response.json({
      averageGrade: average,
    });
  }
}
