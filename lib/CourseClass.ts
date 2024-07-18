import { IMediaExpert, ICourse, Status } from '../types/appwrite.types';

export class CourseClass implements ICourse {
  public $id: string;
  public $collectionId: string;
  public $databaseId: string;
  public $createdAt: string;
  public $updatedAt: string;
  public $permissions: string[];
  public media_expert: IMediaExpert[];

  constructor(
    public title: string,
    public description: string,
    public status: Status,
    public userId: string,
    public course_area: string,
    public duration: number,
    media_expert: IMediaExpert[] = [],
  ) {
    this.$id = "";
    this.$collectionId = "";
    this.$databaseId = "";
    this.$createdAt = new Date().toISOString();
    this.$updatedAt = new Date().toISOString();
    this.$permissions = [];
    this.media_expert = media_expert;
    this.media_expert = media_expert;
  }

  addParticipant(person: IMediaExpert): void {
    this.media_expert.push(person);
    console.log(`${person.name} has been added to the course ${this.title}`);
  }
}