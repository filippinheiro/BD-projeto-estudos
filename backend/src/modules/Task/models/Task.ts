interface TaskDTO {
  id: string;
  description: string;
  complete?: boolean;
}

export default class Task {
  id: string;

  description: string;

  complete: boolean;

  constructor({ complete = false, description, id }: TaskDTO) {
    this.id = id;
    this.description = description;
    this.complete = complete;
  }
}
