import { IMediaExpert } from "./IMediaExpert";

export interface ICourse {
  title: string;
  description: string;
  specializationField: string;
  duration: number;
  participants: IMediaExpert[];
  addParticipant(person: IMediaExpert): void;
}