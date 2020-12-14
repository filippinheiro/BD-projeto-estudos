import { Router } from 'express';
import ExamsController from '../controllers/ExamsController';

const examsRoutes = Router();

const examsController = new ExamsController();

examsRoutes.get('/:id', examsController.index);

export default examsRoutes;
