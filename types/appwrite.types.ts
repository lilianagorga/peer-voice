import { Models } from "node-appwrite";

export interface Password extends Models.Document {
  password: string;
  userId: string;
}

export interface CourseJoined extends Models.Document {
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
  joinTeam: joinTeam;
}

export interface ICourse extends Models.Document {
  $id: string;
  title: string;
  description: string;
  status: Status;
  userId: string,
  course_area: string;
  media_expert?: IMediaExpert[];
}

export interface IPlatform extends Models.Document {
  $id: string;
  name: string;
  type: Type;
  userId: string,
  description?: string;
  content: FormData | undefined;
  contentUrl?: string;
  contentId?: string;
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