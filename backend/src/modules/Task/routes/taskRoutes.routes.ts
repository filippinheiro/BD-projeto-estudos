import { Router } from 'express';
import ensureAuthenticaded from 'infra/http/middlewares/EnsureAunthenticaded';
import TaskController from '../controllers/TaskController';

const taskRoutes = Router();

const userController = new TaskController();

taskRoutes.use(ensureAuthenticaded);

taskRoutes.get('/', userController.index);
taskRoutes.post('/', userController.store);
taskRoutes.put('/', userController.update);

export default taskRoutes;
