import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUserService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService(request.client);

    const users = await listUsers.execute();
    return response.json(users);
  }

  public async store(request: Request, response: Response): Promise<Response> {
    const { email, name, password, birth } = request.body;

    const createUser = new CreateUserService(request.client);

    const user = await createUser.execute({
      email,
      name,
      password,
      birth,
    });

    delete user.password;

    return response.json(user);
  }
}
