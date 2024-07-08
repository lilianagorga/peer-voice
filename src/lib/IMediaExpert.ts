import { ITrainingProgram } from "./ITrainingProgram";

export interface IMediaExpert {
  firstName: string;
  lastName: string;
  specialization: string;
  experience: number;
  interests: string[];
  joinProgram(program: ITrainingProgram): void;
}