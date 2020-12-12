import AppError from 'errors/AppError';
import { PoolClient } from 'pg';
import SubjectDAO from '../DAO/SubjectDAO';
import Subject from '../Models/Subject';

export default class ListSubjectService {
  subjectDao: SubjectDAO;

  constructor(client: PoolClient) {
    this.subjectDao = new SubjectDAO(client);
  }

  public async execute(): Promise<Subject[] | null> {
    try {
      const subjects = await this.subjectDao.listAll();

      return subjects;
    } catch (err) {
      throw new AppError(err, 500);
    }
  }
}
