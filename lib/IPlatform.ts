import { IMediaExpert } from "./IMediaExpert";

export interface IPlatform {
  name: string;
  type: string;
  description: string;
  contentCategories: string[];
  publishContent(person: IMediaExpert, content: string): void;
}