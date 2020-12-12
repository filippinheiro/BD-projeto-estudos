interface UserDTO {
  id: string;
  email: string;
  password?: string;
  name: string;
  birth: Date;
}

export default class User {
  id: string;

  email: string;

  password: string | undefined;

  name: string;

  birth: Date;

  constructor({ id, email, password = '', name, birth }: UserDTO) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.id = id;
    this.birth = birth;
  }
}
