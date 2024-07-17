/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

declare type Status = "pending" | "scheduled" | "cancelled";
declare type Type = "print" | "online" | "audiovisual";

declare interface CreateUserParams {
  name: string;
  email: string;
  phone: string;
}

declare interface User extends CreateUserParams {
  $id: string;
}

declare interface RegisterUserParams extends CreateUserParams {
  userId: string;
  password: string;
  identificationDocument: FormData | undefined;
  interests?: string[];
  bio?: string;
  specialization?: string;
  course?: ICourse[];
  platform?: IPlatform[];
}

declare interface IMediaExpert extends RegisterUserParams {
  $id: string;
  joinCourse(course: ICourse): void;
}

declare interface ICreateCourseParams {
  title: string;
  description: string;
  status: Status;
  course_area: string;
  duration: number;
  media_expert?: IMediaExpert[];
}

declare interface ICourse extends ICreateCourseParams {
  $id: string;
  userId: string,
  addParticipant(person: IMediaExpert): void;
}

declare interface ICreatePlatformParams {
  name: string;
  type: Type;
  description?: string;
  content_categories: string[];
  media_expert?: IMediaExpert;
}

declare interface IPlatform extends ICreatePlatformParams {
  $id: string;
  userId: string,
  publishContent(person: IMediaExpert, content: string): void;
}