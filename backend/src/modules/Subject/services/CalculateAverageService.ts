import { PoolClient } from 'pg';
import SubjectDAO from '../DAO/SubjectDAO';

interface RequestDTO {
  idStudent: string;
  idSubject: string;
}

export default class CalculateAverageService {
  private subjectDao: SubjectDAO;

  constructor(client: PoolClient) {
    this.subjectDao = new SubjectDAO(client);
  }

  public async execute({ idStudent, idSubject }: RequestDTO): Promise<number> {
    const average = await this.subjectDao.findAverageGrade({
      idStudent,
      idSubject,
    });

    return average;
  }
}
