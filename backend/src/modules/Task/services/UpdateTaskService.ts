import AppError from 'errors/AppError';
import { PoolClient } from 'pg';
import TaskDAO from '../DAO/TaskDAO';

interface RequestDTO {
  id: string;
  description: string;
  complete: boolean;
}

export default class UpdateTaskService {
  private taskDao: TaskDAO;

  constructor(client: PoolClient) {
    this.taskDao = new TaskDAO(client);
  }

  public async execute({
    description,
    id,
    complete,
  }: RequestDTO): Promise<void> {
    try {
      await this.taskDao.update(description, id, complete);
      
    } catch (err) {
      throw new AppError(err);
    }
  }
}
