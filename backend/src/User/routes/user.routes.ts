import { Router } from 'express';
import SignUpController from 'User/controllers/SingUpController';

const loginRoutes = Router();

const createUserControler = new SignUpController();

loginRoutes.post('/signup', createUserControler.create);

export default loginRoutes;
