import { Router } from 'express';
import UserController from '../controllers/UserController';

const userRoutes = Router();

const userController = new UserController();

userRoutes.post('/signup', userController.store);
userRoutes.get('/', userController.index);

export default userRoutes;
