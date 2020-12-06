import LoginController from 'User/controllers/LoginController';
import { Router } from 'express';

const userRoutes = Router();

const authenticateController = new LoginController();

userRoutes.post('/', authenticateController.create);

export default userRoutes;
