import { ITrainingProgram } from './ITrainingProgram';
import { IMediaExpert } from './IMediaExpert';

export class TrainingProgram implements ITrainingProgram {
  participants: IMediaExpert[] = [];

  constructor(
    public title: string,
    public description: string,
    public specializationField: string,
    public duration: number
  ) {}

  addParticipant(person: IMediaExpert): void {
    this.participants.push(person);
    console.log(`${person.firstName} has been added to the program ${this.title}`);
  }
}