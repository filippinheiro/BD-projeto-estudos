import { Router } from 'express';
import ensureAuthenticaded from 'infra/http/middlewares/EnsureAunthenticaded';
import SubjectController from '../controllers/SubjectController';
import SubscriptionController from '../controllers/SubscriptionController';

const subjectRoutes = Router();

const subjectController = new SubjectController();
const subscriptionController = new SubscriptionController();

subjectRoutes.use(ensureAuthenticaded);

subjectRoutes.get('/', subjectController.index);
subjectRoutes.post('/subscribe', subscriptionController.create);

export default subjectRoutes;
