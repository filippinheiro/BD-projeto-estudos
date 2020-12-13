import { PoolClient } from 'pg';
import UserDAO from '../DAO/UserDAO';
import User from '../Model/User';

export default class ShowProfileService {
  userDao: UserDAO;

  constructor(client: PoolClient) {
    this.userDao = new UserDAO(client);
  }

  public async execute(id: string): Promise<User | null> {
    const user = await this.userDao.profile(id);

    return user;
  }
}
