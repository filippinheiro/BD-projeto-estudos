import { PoolClient } from 'pg';
import UserDAO from '../DAO/UserDAO';
import User from '../Model/User';

export default class ListUsersService {
  userDao: UserDAO;

  constructor(client: PoolClient) {
    this.userDao = new UserDAO(client);
  }

  public async execute(): Promise<User[] | null> {
    const users = await this.userDao.listAll();

    return users;
  }
}
