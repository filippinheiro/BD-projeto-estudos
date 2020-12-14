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

  public async findAverageGrade({
    idStudent,
    idSubject,
  }: SubscriptionDTO): Promise<number> {
    let average = 0;

    const result = await this.client.query(
      `
      select ROUND(AVG(s.nota), 2) as MEDIA from
        simulado s
          inner join inscricao i on s.idestudante=i.idestudante and s.idmateria=i.idmateria
          inner join estudante e on i.idestudante = e.idestudante 
          inner join materia m on i.idmateria = m.idmateria 
      where e.idestudante=$1 and m.idmateria=$2
      group by (e.idestudante, m.idmateria) 
    `,
      [idStudent, idSubject],
    );

    if (result.rowCount > 0) {
      average = result.rows[0].media;
    }

    this.client.release();

    return average;
  }

  public async findSubscription({
    idStudent,
    idSubject,
  }: SubscriptionDTO): Promise<boolean> {
    const {
      rowCount,
    } = await this.client.query(
      'SELECT * FROM inscricao WHERE idestudante=$1 AND idmateria=$2',
      [idStudent, idSubject],
    );

    return rowCount > 0;
  }

  public async subscribe({
    idStudent,
    idSubject,
  }: SubscriptionDTO): Promise<void> {
    try {
      await this.client.query(
        'INSERT INTO inscricao(idestudante, idmateria) VALUES ($1, $2)',
        [idStudent, idSubject],
      );

      this.client.release();
    } catch (err) {
      this.client.release();
      throw new AppError('Are you sure the subject exists?');
    }
  }

  public async listAll(): Promise<Subject[]> {
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
    return [] as Subject[];
  }
}
