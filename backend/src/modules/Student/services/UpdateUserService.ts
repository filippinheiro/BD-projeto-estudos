import AppError from 'errors/AppError';
import { PoolClient } from 'pg';
import UserDAO from '../DAO/UserDAO';

interface RequestDTO {
  name: string;
  id: string;
  birth: Date;
  email: string;
}

export default class UpdateUserService {
  private userDao: UserDAO;

  constructor(client: PoolClient) {
    this.userDao = new UserDAO(client);
  }

  public async execute({ email, ...rest }: RequestDTO): Promise<void> {
    try {
      await this.userDao.updateUser({ ...rest, e_mail: email });
    } catch (err) {
      throw new AppError(err);
    }
  }
}
