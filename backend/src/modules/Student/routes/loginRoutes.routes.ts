import { Router } from 'express';
import LoginController from '../controllers/LoginController';

const loginRoutes = Router();

const loginController = new LoginController();

loginRoutes.post('/', loginController.create);

export default loginRoutes;
