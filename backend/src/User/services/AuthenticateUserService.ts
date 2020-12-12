import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { PoolClient } from 'pg';
import AppError from '../../errors/AppError';
import auth from '../../config/auth';
import UserDAO from '../DAO/UserDAO';
import User from '../Model/User';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  userDAO: UserDAO;

  constructor(client: PoolClient) {
    this.userDAO = new UserDAO(client);
  }

  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const user = await this.userDAO.findByEmail(email);
    let token = '';

    if (!user) {
      throw new AppError('Invalid Email or password', 401);
    }

    if (compare(password, user.password)) {
      token = sign({}, auth.jwt.secret, {
        subject: user.id,
        expiresIn: auth.jwt.expiresIn,
      });
    } else {
      throw new AppError('Invalid email or password', 401);
    }

    return {
      user,
      token,
    };
  }
}
