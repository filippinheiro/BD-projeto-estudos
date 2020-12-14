interface ExamDTO {
  id: string;

  grade: number;

  title: string;
}

export default class Exam {
  id: string;

  grade: number;

  title: string;

  constructor({ grade, id, title }: ExamDTO) {
    this.grade = grade;
    this.id = id;
    this.title = title;
  }
}
