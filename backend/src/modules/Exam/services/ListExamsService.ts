import AppError from 'errors/AppError';
import { PoolClient } from 'pg';
import ExamDAO from '../DAO/ExamDAO';
import Exam from '../Model/Exam';

interface RequestDTO {
  studentId: string;
  subjectId: string;
}

export default class ListExamsService {
  private examDAO: ExamDAO;

  constructor(client: PoolClient) {
    this.examDAO = new ExamDAO(client);
  }

  public async execute({
    studentId,
    subjectId,
  }: RequestDTO): Promise<Exam[] | null> {
    try {
      const exams = await this.examDAO.findAllExams({ studentId, subjectId });

      return exams;
    } catch (err) {
      throw new AppError(err);
    }
  }
}
