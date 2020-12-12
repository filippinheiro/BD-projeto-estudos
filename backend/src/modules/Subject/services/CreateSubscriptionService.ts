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
    const subscribedAlready = await this.subjectDao.findSubscription({
      idStudent,
      idSubject,
    });

    if (!subscribedAlready) {
      await this.subjectDao.subscribe({ idStudent, idSubject });
      return;
    }

    this.subjectDao.client.release();
    throw new AppError('Você já está inscrito nessa materia');
  }
}
