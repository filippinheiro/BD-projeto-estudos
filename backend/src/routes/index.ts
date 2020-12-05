import { Router } from 'express';
import loginRoutes from 'User/routes/LoginRoutes';

const routes = Router();

routes.use('/sessions', loginRoutes);

export default routes;
