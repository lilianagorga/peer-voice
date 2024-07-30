# Peer Voice

Peer Voice is a platform dedicated to raising awareness about gender equality through the dissemination of content on various platforms and courses.

## Technologies Used

- **Next.js**: Framework used for building the application.
- **TypeScript**: Programming language used for adding static typing.
- **Appwrite**: Platform used for backend and database management.
- **ShadCN**: UI components library.
- **Tailwind CSS**: CSS framework used for designing the user interface.

## Requisiti

- **Node.js**
- **NPM**
- **Appwrite CSS framework used for designing the user interface**

## Features

- **User Registration**: Users can register with a unique passkey, which represents their userId. This allows easy association of the user with their data and access to platform functionalities.
- **Login**: Users can log in using the passkey.
- **Course Joining**: Media experts can join existing courses on their admin page.
- **Adding Participants to Courses**: Media experts can add other registered experts on the platform to existing courses.
- **Content Publishing**: Media experts can publish content on various platforms. This process involves choosing an existing platform and selecting the expert who created the content, followed by uploading the content itself.
- **Platform Management**: Media experts can create platforms and upload their content simultaneously.
- **Dashboard**:
  - **Admin Dashboard**: Provides an up-to-date overview of the status of courses the admin has joined. The table in the admin dashboard represents the status of joined courses. The "scheduled" status represents the addition of a participant. If this status changes from "scheduled" to "pending" or "cancelled," that participant will be removed.
  - **Team Dashboard**: Provides a detailed view of the number of participants for each existing course and the number of contents for each existing platform.


## Project Structure

- **app/**: Contains all the pages and components of the project.
  - **mediaExperts/[userId]**
    - **admin**
      - **page.tsx**: Admin page to join courses and manage their status.
    - **courses**
      - **[courseId]**
        - **addParticipant**
          - **page.tsx**: Page to add participants to a course.
        - **joinCourse**
          - **page.tsx**: Page to join a course.
    - **platforms**
      - **[platformId]**
        - **publishContent**
          - **page.tsx**: Page to publish content on a platform.
    - **register**
      - **page.tsx**: Media expert registration page.
    - **team**
      - **page.tsx**: Team page to create courses, create platforms, add participants, and publish content.

- **components/**: Contains reusable UI components.
  - **commons/**
    - **CustomFormField.tsx**: Custom form field component.
    - **Success.tsx**: Component that displays a message after successfully completing an action.
  - **forms/**
    - **RegisterForm.tsx**: Media expert registration form.
    - **UserForm.tsx**: User form.
  - **table/**
    - **columns.tsx**: Columns for the joined courses status table.
    - **columnsCourse.tsx**: Columns for the course participants table.
    - **columnsPlatform.tsx**: Columns for the platforms and their contents table.
    - **DataTable.tsx**: Data table component.
  - **AddParticipant.tsx**: Component to add participants.
  - **Course.tsx**: Component to create courses.
  - **FileUploader.tsx**: Component to upload content and media expert documents.
  - **JoinCourse.tsx**: Component to join courses.
  - **Platform.tsx**: Component to create platforms.
  - **PublishContent.tsx**: Component to publish content.

- **constants/**: Contains constants used in the application.

- **context/**: Contains React contexts for global state management.

- **lib/**: Contains Appwrite configurations and utility functions.
  - **actions/**
    - **course.actions.ts**: Actions for courses.
    - **media_expert.actions.ts**: Actions for media experts.
    - **platform.actions.ts**: Actions for platforms.
  - **appwrite.config.ts**: Appwrite configuration.
  - **validation.ts**: Contains validation schemas for forms using Zod.

- **pages/api/**: Contains API endpoints that handle backend requests.
  - **verifyPasskey.ts**: Endpoint to verify the passkey.

- **types/**: Contains TypeScript type definitions.
  - **appwrite.types.ts**: Types for Appwrite.
  - **index.d.ts**: Global type definitions.

## Installation and Setup 

1. **Clone the repository:**
  ```bash
  git clone https://github.com/your-username/peer-voice.git
  cd peer-voice
  ```

2. **Install dependencies:**
  ```bash
  npm install
  ```

3. **Set up environment variables:**
  Create a `.env` file at the root of the project and add the following variables:
  ```bash
  ENDPOINT=<Appwrite endpoint>
  PROJECT_ID=<Appwrite project ID>
  API_KEY=<Appwrite API key>
  DATABASE_ID=<Appwrite database ID>
  COURSE_COLLECTION_ID=<ID courses collection>
  MEDIA_EXPERT_COLLECTION_ID=<ID media expert collection>
  PLATFORM_COLLECTION_ID=<ID platforms collection>
  PASSKEY_MAP_COLLECTION_ID=<ID passkey collection>
  COURSE_JOINED_COLLECTION_ID=<ID joined courses collection>
  BUCKET_ID=<ID bucket for Appwrite storage>
  ```

4. **Configure Appwrite:**
    Create a `appwrite.config.ts` file:
    ```bash
    import * as sdk from "node-appwrite";
    export const {
      ENDPOINT,
      PROJECT_ID,
      API_KEY,
      DATABASE_ID,
      COURSE_COLLECTION_ID,
      MEDIA_EXPERT_COLLECTION_ID,
      PLATFORM_COLLECTION_ID,
      PASSKEY_MAP_COLLECTION_ID,
      COURSE_JOINED_COLLECTION_ID,
      BUCKET_ID,
    } = process.env;
    const client = new sdk.Client();
    client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);
    export const databases = new sdk.Databases(client);
    export const users = new sdk.Users(client);
    export const storage = new sdk.Storage(client);
    ```

5. **Set up TypeScript types:**
    Create a `appwrite.types.ts` file to define the necessary types for your Appwrite models:
    ```bash
    import { Models } from "node-appwrite";

    export interface PasskeyMapDocument extends Models.Document {
      passkey: string;
      userId: string;
    }

    export interface CourseJoined extends Models.Document {
      courseId: string;
      mediaExpertId: string;
      status: Status;
    }

    export interface IMediaExpert extends Models.Document {
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
      title: string;
      description: string;
      status: Status;
      userId: string;
      course_area: string;
      media_expert?: IMediaExpert[];
    }

    export interface IPlatform extends Models.Document {
      name: string;
      type: Type;
      userId: string;
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
    ```

6. **Start the application:**
  ```bash
  npm run dev
  ```


7. **Production Setup:**
  Create a `.env.production` file at the root of the project and add the following variables:
  ```bash
  ENDPOINT=<Appwrite endpoint>
  PROJECT_ID=<Appwrite project ID>
  API_KEY=<Appwrite API key>
  DATABASE_ID=<Appwrite database ID>
  COURSE_COLLECTION_ID=<ID courses collection>
  MEDIA_EXPERT_COLLECTION_ID=<ID media expert collection>
  PLATFORM_COLLECTION_ID=<ID platforms collection>
  PASSKEY_MAP_COLLECTION_ID=<ID passkey collection>
  COURSE_JOINED_COLLECTION_ID=<ID joined courses collection>
  BUCKET_ID=<ID bucket for Appwrite storage>
  ```

8. **To build the application for production, use the following command:**
  ```bash
  npm run build
  ```

## Live Deploy
* The application will be accessible at https://peer-voice.lilianagorga.com/



