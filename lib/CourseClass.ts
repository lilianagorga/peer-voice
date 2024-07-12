import { ICourse } from "./ICourse";
import { IMediaExpert } from './IMediaExpert';

export class CourseClass implements ICourse {
  participants: IMediaExpert[] = [];

  constructor(
    public title: string,
    public description: string,
    public specializationField: string,
    public duration: number
  ) {}

  addParticipant(person: IMediaExpert): void {
    this.participants.push(person);
    console.log(`${person.firstName} has been added to the course ${this.title}`);
  }
}