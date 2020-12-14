import { Router } from 'express';
import UserController from 'modules/Student/controllers/UserController';
import loginRoutes from 'modules/Student/routes/loginRoutes.routes';
import userRoutes from '../../../modules/Student/routes/user.routes';
import subjectRoutes from '../../../modules/Subject/routes/subjects.routes';

const routes = Router();
const userController = new UserController();

routes.use('/users', userRoutes);
routes.use('/signin', loginRoutes);
routes.post('/signup', userController.store);
routes.use('/subjects', subjectRoutes);

export default routes;
