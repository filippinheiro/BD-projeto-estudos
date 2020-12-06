import AppError from 'errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import auth from '../../config/auth';
import UserDAO from '../DAO/UserDAO';

interface RequestDTO {
  email: string;
  password: string;
}

interface ResponseDTO {
  user: string;
  token: string;
}

export default class AuthenticateUserService {
  userDAO = new UserDAO();

  public async execute({ email, password }: RequestDTO): Promise<ResponseDTO> {
    const user = this.userDAO.findByEmail(email);
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
