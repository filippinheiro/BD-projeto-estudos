interface SubjectDTO {
  id: string;
  classroom: string;
  name: string;
  teacher: string;
  observations?: string;
}

export default class Subject {
  id: string;

  classroom: string;

  name: string;

  teacher: string;

  observations: string;

  constructor({ id, classroom, name, teacher, observations = '' }: SubjectDTO) {
    this.id = id;
    this.classroom = classroom;
    this.name = name;
    this.teacher = teacher;
    this.observations = observations;
  }
}
