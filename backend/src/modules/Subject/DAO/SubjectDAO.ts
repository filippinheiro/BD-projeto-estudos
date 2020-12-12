import AppError from 'errors/AppError';
import { PoolClient } from 'pg';
import Subject from '../Models/Subject';

export default class SubjectDAO {
  client: PoolClient;

  constructor(client: PoolClient) {
    this.client = client;
  }

  public async subscribe(idStudent: string, idSubject: string): Promise<void> {
    try {
      const result = await this.client.query(
        'INSERT INTO inscricao(idestudante, idmateria) VALUES ($1, $2)',
        [idStudent, idSubject],
      );
    } catch (err) {
      throw new AppError(err, 500);
    } finally {
      this.client.release();
    }
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
