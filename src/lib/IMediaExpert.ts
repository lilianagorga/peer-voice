import { ITrainingProgram } from "./ITrainingProgram";

export interface IMediaExpert {
  firstName: string;
  lastName: string;
  specialization: string;
  experience: number;
  interests: string[];
  participateProgram(program: ITrainingProgram): void;
}