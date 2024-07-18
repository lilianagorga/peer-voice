import { IPlatform, IMediaExpert, Type } from '../types/appwrite.types';

export class PlatformClass implements IPlatform {
  public $id: string;
  public $collectionId: string;
  public $databaseId: string;
  public $createdAt: string;
  public $updatedAt: string;
  public $permissions: string[];

  constructor(
    public name: string,
    public type: Type,
    public description: string,
    public content_categories: string[],
    public userId: string,
    public content: FormData | undefined,
  ) {
    this.$id = "";
    this.$collectionId = "";
    this.$databaseId = "";
    this.$createdAt = new Date().toISOString();
    this.$updatedAt = new Date().toISOString();
    this.$permissions = [];
  }

  publishContent(person: IMediaExpert, content: string): void {
    console.log(`Published content by ${person.name} on ${this.name}: ${content}`);
  }
}