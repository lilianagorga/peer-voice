import { IPlatform } from './IPlatform';
import { IMediaExpert } from './IMediaExpert';

export class PlatformClass implements IPlatform {
  constructor(
    public name: string,
    public type: string,
    public description: string,
    public contentCategories: string[]
  ) {}

  publishContent(person: IMediaExpert, content: string): void {
    console.log(`Published content by ${person.firstName} on ${this.name}: ${content}`);
  }
}