import { hash } from 'bcryptjs';
import { PoolClient } from 'pg';

import AppError from '../../../errors/AppError';

import UserDAO from '../DAO/UserDAO';
import User from '../Model/User';

interface RequestDTO {
  email: string;
  name: string;
  password: string;
  birth: Date;
}

export default class CreateUserService {
  userDAO: UserDAO;

  constructor(client: PoolClient) {
    this.userDAO = new UserDAO(client);
  }

  public async execute({
    email,
    name,
    password,
    birth,
  }: RequestDTO): Promise<User> {
    const userExists = await this.userDAO.findByEmail(email);

    if (!userExists) {
      const hashedPass = await hash(password, 10);

      const user = await this.userDAO.save({
        name,
        e_mail: email,
        birth,
        password: hashedPass,
      });

      return user;
    }

    throw new AppError('This email has already been registered');
  }
}
