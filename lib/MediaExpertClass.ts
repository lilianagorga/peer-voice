import { IMediaExpert } from './IMediaExpert';
import { ICourse } from "./ICourse";

export class MediaExpertClass implements IMediaExpert {
  constructor(
    public firstName: string,
    public lastName: string,
    public specialization: string,
    public experience: number,
    public interests: string[]
  ) {}

  joinCourse(course: ICourse): void {
    console.log(`${this.firstName} is participating in the course ${course.title}`);
  }
}