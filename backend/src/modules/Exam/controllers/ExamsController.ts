import { Request, Response } from 'express';
import ListExamsService from '../services/ListExamsService';

export default class ExamsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { id: subjectId } = request.params;

    const listExams = new ListExamsService(request.client);

    const exams = await listExams.execute({
      studentId: id,
      subjectId,
    });

    return response.json(exams);
  }
}
