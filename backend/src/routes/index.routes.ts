import { Router } from 'express';
import loginRoutes from '../User/routes/loginRoutes.routes';
import userRoutes from '../User/routes/user.routes';

const routes = Router();

routes.use('/sessions', loginRoutes);
routes.use('/user', userRoutes);

export default routes;
