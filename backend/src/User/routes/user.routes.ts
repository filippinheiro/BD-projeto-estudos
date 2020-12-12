import { Router } from 'express';
import SignUpController from '../controllers/SingUpController';

const loginRoutes = Router();

const signUpControler = new SignUpController();

loginRoutes.post('/signup', signUpControler.create);

export default loginRoutes;
