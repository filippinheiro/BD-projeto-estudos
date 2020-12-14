import { Request, Response } from 'express';
import CreateSubscriptionService from '../services/CreateSubscriptionService';

export default class SubscriptionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createSubscription = new CreateSubscriptionService(request.client);

    const { id } = request.user;

    const { idSubject } = request.body;

    await createSubscription.execute({ idStudent: id, idSubject });

    return response.status(201).json();
  }
}
