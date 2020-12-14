import AppError from 'errors/AppError';
import { PoolClient } from 'pg';
import Task from '../models/Task';

interface TaskDTO {
  description: string;
  studentId: string;
}

export default class TaskDAO {
  private client: PoolClient;

  constructor(client: PoolClient) {
    this.client = client;
  }

  // public async markComplete(id: string) {
  //   try {
  //     await this.client.query()
  //   }
  // }

  public async update(
    description: string,
    id: string,
    complete = false,
  ): Promise<void> {
    try {
      await this.client.query(
        'UPDATE tarefa SET descricao=$1, concluido=$2 WHERE idtarefa=$3',
        [description, complete, id],
      );

      this.client.release();
    } catch (err) {
      this.client.release();
      throw new AppError(err);
    }
  }

  public async save({ description, studentId }: TaskDTO): Promise<Task> {
    try {
      const results = await this.client.query(
        `
      INSERT INTO tarefa(descricao, idestudante) VALUES($1, $2) RETURNING *
    `,
        [description, studentId],
      );

      const tasks = results.rows.map((item) => {
        const { descricao, idtarefa } = item;

        const task = new Task({
          description: descricao,
          id: idtarefa,
        });

        return task;
      });

      this.client.release();

      return tasks[0];
    } catch (err) {
      this.client.release();
      throw new AppError('Student doesnt exist');
    }
  }

  public async listAll(id: string): Promise<Task[]> {
    let tasks: Task[] = [];
    const results = await this.client.query(
      `
    SELECT t.* FROM
      tarefa t
      INNER JOIN estudante e ON t.idestudante = e.idestudante
     WHERE e.idestudante=$1
     `,
      [id],
    );

    if (results.rowCount > 0) {
      tasks = results.rows.map((item) => {
        const { descricao, idtarefa, concluido } = item;

        return new Task({
          description: descricao,
          id: idtarefa,
          complete: concluido,
        });
      });
    }

    this.client.release();
    return tasks;
  }
}
