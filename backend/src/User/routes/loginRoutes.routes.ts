import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const userRoutes = Router();

const loginController = new LoginController();

userRoutes.post('/', loginController.create);

export default userRoutes;
