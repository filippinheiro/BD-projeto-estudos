import LoginController from 'User/controllers/LoginController';
import { Router } from 'express';

const loginRoutes = Router();

const authenticateController = new LoginController();

loginRoutes.post('/login', authenticateController.create);

export default loginRoutes;
