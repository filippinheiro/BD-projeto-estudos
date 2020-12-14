import { PoolClient } from 'pg';
import TaskDAO from '../DAO/TaskDAO';
import Task from '../models/Task';

interface RequestDTO {
  description: string;
  id: string;
}

export default class CreateTaskService {
  taskDao: TaskDAO;

  constructor(client: PoolClient) {
    this.taskDao = new TaskDAO(client);
  }

  public async execute({ description, id }: RequestDTO): Promise<Task> {
    const task = await this.taskDao.save({ description, studentId: id });

    return task;
  }
}
