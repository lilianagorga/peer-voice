import { IMediaExpert } from "./IMediaExpert";

export interface ITrainingProgram {
  title: string;
  description: string;
  specializationField: string;
  duration: number;
  participants: IMediaExpert[];
  addParticipant(person: IMediaExpert): void;
}