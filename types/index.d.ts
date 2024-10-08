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
  identificationDocument: FormData | undefined;
  interests?: string[];
  bio?: string;
  specialization?: string;
  course?: ICourse[];
}

declare interface IMediaExpert extends RegisterUserParams {
  $id: string;
}

declare interface ICreateCourseParams {
  title: string;
  description: string;
  status: Status;
  course_area: string;
  media_expert?: IMediaExpert[];
}

declare interface ICourse extends ICreateCourseParams {
  $id: string;
  $collectionId: string;
  $databaseId: string;
  $createdAt: string;
  $updatedAt: string;
  $permissions: string[];
  userId: string,
}

declare interface ICreatePlatformParams {
  userId: string,
  name: string;
  type: Type;
  description?: string;
  content: FormData | undefined;
  contentUrl?: string;
  contentId?: string;
}

declare interface IPlatform extends ICreatePlatformParams {
  $id: string;
}