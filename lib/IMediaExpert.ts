import { ICourse } from "./ICourse";

export interface IMediaExpert {
  firstName: string;
  lastName: string;
  specialization: string;
  experience: number;
  interests: string[];
  joinCourse(course: ICourse): void;
}