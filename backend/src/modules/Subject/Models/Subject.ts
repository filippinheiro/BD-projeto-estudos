import User from 'modules/Student/Model/User';

interface SubjectDTO {
  id: string;
  classroom: string;
  name: string;
  teacher: string;
  observations?: string;
  students?: User[];
}

export default class Subject {
  id: string;

  classroom: string;

  name: string;

  teacher: string;

  observations: string;

  students: User[];

  constructor({
    id,
    classroom,
    name,
    teacher,
    observations = '',
    students = [],
  }: SubjectDTO) {
    this.id = id;
    this.classroom = classroom;
    this.name = name;
    this.teacher = teacher;
    this.observations = observations;
    this.students = students;
  }
}
