import { PoolClient } from 'pg';
import AppError from '../../../errors/AppError';
import Subject from '../Models/Subject';

interface SubscriptionDTO {
  idStudent: string;
  idSubject: string;
}

export default class SubjectDAO {
  client: PoolClient;

  constructor(client: PoolClient) {
    this.client = client;
  }

  public async findSubscription({
    idStudent,
    idSubject,
  }: SubscriptionDTO): Promise<boolean> {
    try {
      const {
        rowCount,
      } = await this.client.query(
        'SELECT * FROM inscricao WHERE idestudante=$1 AND idmateria=$2',
        [idStudent, idSubject],
      );

      return rowCount > 0;
    } catch (err) {
      throw new AppError(err);
    }
  }

  public async subscribe({
    idStudent,
    idSubject,
  }: SubscriptionDTO): Promise<void> {
    await this.client.query(
      'INSERT INTO inscricao(idestudante, idmateria) VALUES ($1, $2)',
      [idStudent, idSubject],
    );

    this.client.release();
  }

  public async listAll(): Promise<Subject[] | null> {
    try {
      const result = await this.client.query('SELECT * FROM materia');

      if (result.rowCount > 0) {
        const subjects = result.rows.map((item) => {
          const { nome, idmateria, observacoes, professor, sala } = item;

          const subject = new Subject({
            name: nome,
            id: idmateria,
            teacher: professor,
            observations: observacoes,
            classroom: sala,
          });

          return subject;
        });

        this.client.release();
        return subjects;
      }
    } catch (err) {
      this.client.release();
      throw new AppError(err);
    }
    return null;
  }
}
