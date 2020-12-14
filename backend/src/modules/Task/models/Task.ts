interface TaskDTO {
  id: string;
  description: string;
}

export default class Task {
  id: string;

  description: string;

  constructor({ description, id }: TaskDTO) {
    this.id = id;
    this.description = description;
  }
}
