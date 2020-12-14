import { Request, Response } from 'express';
import ShowProfileService from '../services/ShowProfileService';

export default class UserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const findUser = new ShowProfileService(request.client);

    const user = await findUser.execute(id);

    delete user?.password;
    return response.json(user);
  }
}
