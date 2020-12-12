import AppError from 'errors/AppError';
import { PoolClient } from 'pg';
import SubjectDAO from '../DAO/SubjectDAO';

interface RequestDTO {
  idSubject: string;
  idStudent: string;
}

export default class ListSubjectService {
  subjectDao: SubjectDAO;

  constructor(client: PoolClient) {
    this.subjectDao = new SubjectDAO(client);
  }

  public async execute({ idStudent, idSubject }: RequestDTO): Promise<void> {
    try {
      await this.subjectDao.subscribe(idStudent, idSubject);
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}
