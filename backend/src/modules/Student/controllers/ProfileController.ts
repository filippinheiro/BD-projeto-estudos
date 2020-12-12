import { Request, Response } from 'express';
import FindUserService from '../services/FindUserService';

export default class UserController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const findUser = new FindUserService(request.client);

    const user = await findUser.execute(id);

    delete user?.password;
    return response.json(user);
  }
}
