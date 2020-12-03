import { Router } from 'express';

const routes = Router();

routes.use('/api', (_, res) => {
  return res.status(200).json({
    message: 'oi',
  });
});

export default routes;
