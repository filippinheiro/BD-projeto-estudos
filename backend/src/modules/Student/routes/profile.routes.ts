import { Router } from 'express';
import ensureAuthenticaded from 'infra/http/middlewares/EnsureAunthenticaded';
import ProfileController from '../controllers/ProfileController';

const profileRoutes = Router();

const profileController = new ProfileController();

profileRoutes.use(ensureAuthenticaded);

profileRoutes.get('/', profileController.show);

export default profileRoutes;
