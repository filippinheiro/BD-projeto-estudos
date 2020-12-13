import { Router } from 'express';
import ensureAuthenticaded from 'infra/http/middlewares/EnsureAunthenticaded';
import UserController from '../controllers/UserController';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post('/signup', userController.store);
userRoutes.get('/', ensureAuthenticaded, userController.index);

export default userRoutes;
