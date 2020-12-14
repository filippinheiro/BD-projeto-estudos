import Subject from 'modules/Subject/Models/Subject';

interface UserDTO {
  id: string;
  email: string;
  password?: string;
  name: string;
  birth: Date;
  subjects?: Subject[];
}

export default class User {
  id: string;

  email: string;

  password: string;

  name: string;

  birth: Date;

  subjects: Subject[];

  constructor({
    id,
    email,
    password = '',
    name,
    birth,
    subjects = [],
  }: UserDTO) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.id = id;
    this.birth = birth;
    this.subjects = subjects;
  }
}
