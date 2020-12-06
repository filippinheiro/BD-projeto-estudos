import AppError from 'errors/AppError';
import { hash } from 'bcryptjs';
import UserDAO from '../DAO/UserDAO';

interface RequestDTO {
  email: string;
  name: string;
  password: string;
}

export default class CreateUserService {
  userDAO = new UserDAO();

  public async execute({ email, name, password }: RequestDTO): Promise<User> {
    const userExists = await this.userDAO.findByEmail(email);
    const token = '';

    if (user) {
      throw new AppError('This email has already been registered');
    }

    const hashedPass = await hash(password, 10);

    const user = await this.userDAO.store({
      name,
      email,
      password: hashedPass,
    });

    return user;
  }
}
