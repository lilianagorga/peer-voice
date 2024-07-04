import { IMediaExpert } from './IMediaExpert';
import { ITrainingProgram } from './ITrainingProgram';

export class MediaExpert implements IMediaExpert {
  constructor(
    public firstName: string,
    public lastName: string,
    public specialization: string,
    public experience: number,
    public interests: string[]
  ) {}

  participateProgram(program: ITrainingProgram): void {
    console.log(`${this.firstName} is participating in the program ${program.title}`);
  }
}