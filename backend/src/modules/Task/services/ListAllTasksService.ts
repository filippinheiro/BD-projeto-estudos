import { PoolClient } from 'pg';
import TaskDAO from '../DAO/TaskDAO';
import Task from '../models/Task';

interface RequestDTO {
  id: string;
}

export default class ListAllTasksService {
  taskDao: TaskDAO;

  constructor(client: PoolClient) {
    this.taskDao = new TaskDAO(client);
  }

  public async execute(data: RequestDTO): Promise<Task[]> {
    const tasks = await this.taskDao.listAll(data.id);

    return tasks;
  }
}
