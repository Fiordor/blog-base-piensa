export class Article {
  id: number;
  title: string;
  content: string;
  image: string;
  dateCreate: Date;
  datePost: Date;
  done: number;
  delete: number;
  userCreate: string;
  userPost: string;

  constructor() {
    this.id = 0;
    this.title = '';
    this.content = '';
    this.image = '';
    this.dateCreate = new Date(0);
    this.datePost = new Date(0);
    this.done = 0;
    this.delete = 0;
    this.userCreate = '';
    this.userPost = '';
  }
}
