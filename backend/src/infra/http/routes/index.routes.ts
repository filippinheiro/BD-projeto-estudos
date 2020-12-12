import { Router } from 'express';
import profileRoutes from 'modules/Student/routes/profile.routes';
import loginRoutes from '../../../modules/Student/routes/loginRoutes.routes';
import userRoutes from '../../../modules/Student/routes/user.routes';
import subjectRoutes from '../../../modules/Subject/routes/subjects.routes';

const routes = Router();

routes.use('/sessions', loginRoutes);
routes.use('/users', userRoutes);
routes.use('/profile', profileRoutes);
routes.use('/subjects', subjectRoutes);

export default routes;
