import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

export default class SignUpController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, name, password, birth } = request.body;

    const createUser = new CreateUserService(request.client);

    const user = await createUser.execute({
      email,
      name,
      password,
      birth,
    });

    return response.json(user);
  }
}
