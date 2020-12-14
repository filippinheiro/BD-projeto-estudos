import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ListUsersService from '../services/ListUserService';
import UpdateUserService from '../services/UpdateUserService';

export default class UserController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUsersService(request.client);

    const users = await listUsers.execute();

    return response.json(users);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, birth, email } = request.body;
    const { id } = request.user;
    const updateUser = new UpdateUserService(request.client);

    await updateUser.execute({ name, id, birth, email });

    return response.status(204).json();
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

    return response.status(201).json(user);
  }
}
