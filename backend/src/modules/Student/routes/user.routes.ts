import { Router } from 'express';
import ensureAuthenticaded from 'infra/http/middlewares/EnsureAunthenticaded';
import examsRoutes from 'modules/Exam/routes/exams.routes';
import taskRoutes from 'modules/Task/routes/taskRoutes.routes';
import UserController from '../controllers/UserController';
import profileRoutes from './profile.routes';

const userRoutes = Router();

const userController = new UserController();

userRoutes.use(ensureAuthenticaded);

userRoutes.use('/profile', profileRoutes);
userRoutes.use('/exams', examsRoutes);
userRoutes.use('/tasks', taskRoutes);
userRoutes.get('/', userController.index);
userRoutes.put('/', userController.update);

export default userRoutes;
