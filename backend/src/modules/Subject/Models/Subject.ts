import User from 'modules/Student/Model/User';

interface SubjectDTO {
  id: string;
  classroom: string;
  name: string;
  teacher: string;
  observations?: string;
  average?: number;
  students?: User[];
}

export default class Subject {
  id: string;

  classroom: string;

  name: string;

  teacher: string;

  observations: string;

  average: number;

  students: User[];

  constructor({
    id,
    classroom,
    name,
    teacher,
    observations = '',
    average = 0,
    students = [],
  }: SubjectDTO) {
    this.id = id;
    this.classroom = classroom;
    this.name = name;
    this.teacher = teacher;
    this.average = average;
    this.observations = observations;
    this.students = students;
  }
}
