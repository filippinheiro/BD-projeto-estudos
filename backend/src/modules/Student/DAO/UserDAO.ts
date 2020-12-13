/* eslint-disable camelcase */
import Subject from 'modules/Subject/Models/Subject';
import { PoolClient } from 'pg';
import AppError from '../../../errors/AppError';
import User from '../Model/User';

interface createUserDTO {
  name: string;
  e_mail: string;
  password: string;
  birth: Date;
}

interface SubjectResult {
  idmateria: string;
  observacao: string;
  nome: string;
  professor: string;
  sala: string;
}

export default class UserDAO {
  client: PoolClient;

  constructor(client: PoolClient) {
    this.client = client;
  }

  async findByEmail(emailParam: string): Promise<User | null> {
    try {
      const result = await this.client.query(
        'SELECT * FROM estudante WHERE email=$1',
        [emailParam],
      );

      if (result.rowCount > 0) {
        const users = result.rows.map((item) => {
          const { nome, email, senha, idestudante, datanascimento } = item;

          const user = new User({
            name: nome,
            email,
            password: senha,
            id: idestudante,
            birth: datanascimento,
          });

          return user;
        });

        this.client.release();

        return users[0];
      }
    } catch (err) {
      this.client.release();
      throw new AppError(err);
    }
    return null;
  }

  async updatePassword(password: string, id: string): Promise<void> {
    try {
      await this.client.query(
        'UPDATE estudante SET senha=$1 WHERE idestudante=$2 RETURNING *',
        [password, id],
      );
      this.client.release();
    } catch (err) {
      this.client.release();
      throw new AppError(err);
    }
  }

  async updateUser(data: createUserDTO, id: string): Promise<User | null> {
    try {
      const result = await this.client.query(
        'UPDATE estudante SET nome=$1, email=$2, datanascimento=$3 WHERE idestudante=$4 RETURNING *',
        [data.name, data.e_mail, data.birth, id],
      );

      const users = result.rows.map((item) => {
        const { idestudante, nome, email, senha, datanascimento } = item;

        const user = new User({
          birth: datanascimento,
          id: idestudante,
          name: nome,
          password: senha,
          email,
        });

        return user;
      });

      this.client.release();

      return users[0];
    } catch (err) {
      this.client.release();
      throw new AppError(err);
    }
  }

  async profile(id: string): Promise<User | null> {
    try {
      const result = await this.client.query(
        `SELECT e.* from estudante e
        WHERE e.idestudante=$1`,
        [id],
      );

      if (result.rowCount > 0) {
        const users = result.rows.map(async (item) => {
          const { nome, email, senha, idestudante, datanascimento } = item;
          let subjects: Subject[] = [];
          let user: User | null = null;

          const data = await this.client.query<SubjectResult>(
            `SELECT m.*
            FROM estudante e
              LEFT JOIN inscricao i ON e.idestudante = i.idestudante
              LEFT JOIN materia m ON i.idmateria = m.idmateria
             WHERE e.idestudante=$1`,
            [id],
          );

          if (data.rows[0].idmateria) {
            subjects = data.rows.map((subject) => {
              const {
                idmateria,
                sala,
                nome: nomeMateria,
                professor,
                observacao,
              } = subject;

              return new Subject({
                id: idmateria,
                classroom: sala,
                name: nomeMateria,
                teacher: professor,
                observations: observacao,
              });
            });
          }

          user = new User({
            name: nome,
            email,
            password: senha,
            id: idestudante,
            birth: datanascimento,
            subjects,
          });

          return user;
        });

        this.client.release();

        return users[0];
      }
    } catch (err) {
      this.client.release();
      throw new AppError(err);
    }
    return null;
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.client.query('DELETE FROM estudante WHERE idestudante=$1', [
        id,
      ]);
      this.client.release();
    } catch (err) {
      this.client.release();
      throw new AppError(err);
    }
  }

  async findById(id: string): Promise<User | null> {
    try {
      const result = await this.client.query(
        `SELECT * FROM estudante WHERE idestudante=$1`,
        [id],
      );

      if (result.rowCount > 0) {
        const users = result.rows.map((item) => {
          const { nome, email, senha, idestudante, datanascimento } = item;

          const user = new User({
            name: nome,
            email,
            password: senha,
            id: idestudante,
            birth: datanascimento,
          });

          return user;
        });

        this.client.release();

        return users[0];
      }
    } catch (err) {
      this.client.release();
      throw new AppError(err);
    }
    return null;
  }

  // DO NOT USE IT (I cannot stress this enough)
  async deleteAll(): Promise<void> {
    try {
      await this.client.query('DELETE FROM estudante');
      this.client.release();
    } catch (err) {
      this.client.release();
      throw new AppError(err);
    }
  }

  async listAll(): Promise<User[] | null> {
    try {
      const result = await this.client.query('SELECT * FROM estudante');

      if (result.rowCount > 0) {
        const users = result.rows.map((item) => {
          const { nome, email, senha, idestudante, datanascimento } = item;

          const user = new User({
            name: nome,
            email,
            password: senha,
            id: idestudante,
            birth: datanascimento,
          });

          return user;
        });

        this.client.release();

        return users;
      }
    } catch (err) {
      this.client.release();
      throw new AppError(err);
    }
    return null;
  }

  async save({ name, e_mail, password, birth }: createUserDTO): Promise<User> {
    try {
      const data = await this.client.query(
        'INSERT INTO estudante(nome, email, senha, datanascimento) VALUES($1,$2,$3, $4) RETURNING *',
        [name, e_mail, password, birth],
      );

      const users = data.rows.map((item) => {
        const { idestudante, nome, email, senha, datanascimento } = item;

        const user = new User({
          birth: datanascimento,
          id: idestudante,
          name: nome,
          password: senha,
          email,
        });

        return user;
      });

      this.client.release();

      return users[0];
    } catch (err) {
      this.client.release();
      throw new AppError(err);
    }
  }
}
