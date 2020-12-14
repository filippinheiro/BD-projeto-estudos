import { Request, Response } from 'express';
import CreateTaskService from '../services/CreateTaskService';
import ListAllTasksService from '../services/ListAllTasksService';
import UpdateTaskService from '../services/UpdateTaskService';

export default class TaskController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listTasks = new ListAllTasksService(request.client);

    const { id } = request.user;
    const tasks = await listTasks.execute({ id });

    return response.json(tasks);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const updateTask = new UpdateTaskService(request.client);

    const { taskId, description } = request.body;

    await updateTask.execute({ id: taskId, description });

    return response.status(204).json();
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const createTask = new CreateTaskService(request.client);

    const { id } = request.user;
    const { description } = request.body;
    const task = await createTask.execute({ id, description });

    return response.status(201).json(task);
  }
}
