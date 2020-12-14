import AppError from 'errors/AppError';
import { PoolClient } from 'pg';
import Exam from '../Model/Exam';

interface ExamsDTO {
  studentId: string;
  subjectId: string;
}

export default class ExamDAO {
  private client: PoolClient;

  constructor(client: PoolClient) {
    this.client = client;
  }

  public async findAllExams({
    studentId,
    subjectId,
  }: ExamsDTO): Promise<Exam[]> {
    try {
      const result = await this.client.query(
        `
    select s.* from 
      simulado s
        inner join inscricao i on s.idestudante=i.idestudante and s.idmateria=i.idmateria 
        inner join estudante e on i.idestudante=e.idestudante 
        inner join materia m on i.idmateria=m.idmateria
      where e.idestudante=$1 and m.idmateria=$2
    `,
        [studentId, subjectId],
      );

      if (result.rowCount > 0) {
        const exams = result.rows.map((item) => {
          const { idavaliacao, titulo, nota } = item;

          return new Exam({
            id: idavaliacao,
            title: titulo,
            grade: nota,
          });
        });
        this.client.release();
        return exams;
      }
    } catch (err) {
      this.client.release();
      throw new AppError(err, 500);
    }
    this.client.release();
    return [] as Exam[];
  }
}
