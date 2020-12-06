import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

export default class SignInController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;

    const authenticateUser = new CreateUserService();

    const user = await authenticateUser.execute({
      email,
      name,
      password,
    });

    delete user.password;

    return response.json({
      user,
    });
  }
}
