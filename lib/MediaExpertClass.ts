import { IMediaExpert, ICourse } from '../types/appwrite.types';

export class MediaExpertClass implements IMediaExpert {
  public $id: string;
  public $collectionId: string;
  public $databaseId: string;
  public $createdAt: string;
  public $updatedAt: string;
  public $permissions: string[];

  constructor(
    public name: string,
    public specialization: string,
    public email: string,
    public phone: string,
    public bio: string,
    public userId: string,
    public password: string,
    public interests: string[],
    public identificationDocument: FormData | undefined,
    public course: ICourse[] = [],
  ) {
    this.$id = "";
    this.$collectionId = "";
    this.$databaseId = "";
    this.$createdAt = new Date().toISOString();
    this.$updatedAt = new Date().toISOString();
    this.$permissions = [];
  }

  joinCourse(course: ICourse): void {
    this.course.push(course);
    course.addParticipant(this);
    console.log(`${this.name} is joining the course ${course.title}`);
  }
}