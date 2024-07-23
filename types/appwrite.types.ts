import { Models } from "node-appwrite";

export interface PasskeyMapDocument extends Models.Document {
  passkey: string;
  userId: string;
}

export interface CourseParticipants extends Models.Document {
  courseId: string;
  mediaExpertId: string;
  status: Status;
}

export interface IMediaExpert extends Models.Document {
  $id: string;
  userId: string;
  name: string;
  email: string;
  phone: string;
  identificationDocument: FormData | undefined;
  interests?: string[];
  bio?: string;
  specialization?: string;
  course?: ICourse[];
  platform?: IPlatform[];
  joinTeam: joinTeam; 
  joinCourse(course: ICourse): void;
}

export interface ICourse extends Models.Document {
  $id: string;
  title: string;
  description: string;
  status: Status;
  userId: string,
  course_area: string;
  duration: number;
  media_expert?: IMediaExpert[];
  addParticipant(person: IMediaExpert): void;
}

export interface IPlatform extends Models.Document {
  $id: string;
  name: string;
  type: Type;
  userId: string,
  description?: string;
  content_categories: string[];
  media_expert?: IMediaExpert;
  content: FormData | undefined;
  publishContent(person: IMediaExpert, content: string): void;
}

export enum joinTeam {
  Yes = "yes",
  No = "no",
}

export enum Type {
  Print = "print",
  Online = "online",
  Audiovisual = "audiovisual",
}

export enum Status {
  Pending = "pending",
  Scheduled = "scheduled",
  Cancelled = "cancelled",
}