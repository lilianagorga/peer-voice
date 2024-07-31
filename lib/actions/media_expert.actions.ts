"use server";

import { ID, Query, InputFile } from "node-appwrite";
import { 
  DATABASE_ID,
  MEDIA_EXPERT_COLLECTION_ID,
  PASSWORD_COLLECTION_ID,
  databases,
  users,
  storage,
  BUCKET_ID,
  ENDPOINT,
  PROJECT_ID
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { Password } from "../../types/appwrite.types";

export const createUser = async (user: CreateUserParams, password: string) => {
  try {
    const existingPassword = await databases.listDocuments(
      DATABASE_ID!,
      PASSWORD_COLLECTION_ID!,
      [Query.equal("password", [password])]
    );

    if (existingPassword.documents.length > 0) {
      return { error: 'Password already in use. Please choose a different password.' };
    }
    
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );  

    await databases.createDocument(
      DATABASE_ID!,
      PASSWORD_COLLECTION_ID!,
      ID.unique(),
      { password, userId: newuser.$id }
    );
    return parseStringify(newuser);
  } catch (error: any) {
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};


export const verifyPassword = async (password: string) => {
  try {
    const passwordMapping = await databases.listDocuments(
      DATABASE_ID!,
      PASSWORD_COLLECTION_ID!,
      [Query.equal("password", [password])]
    );

    if (passwordMapping.documents.length === 0) {
      return null;
    }

    const document = passwordMapping.documents[0] as unknown as Password;
    const { userId } = document;
    return userId;
  } catch (error) {
    console.error("An error occurred while verifying the password:", error);
    return null;
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
    return null;
  }
};

export const registerMediaExpert = async ({
  identificationDocument,
  ...mediaExpert
}: RegisterUserParams) => {
  try {
    let file;
    if (identificationDocument) {
      const inputFile =
        identificationDocument &&
        InputFile.fromBlob(
          identificationDocument?.get("blobFile") as Blob,
          identificationDocument?.get("fileName") as string
        );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newMediaExpert = await databases.createDocument(
      DATABASE_ID!,
      MEDIA_EXPERT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...mediaExpert,
      }
    );

    return parseStringify(newMediaExpert);
  } catch (error) {
    console.error("An error occurred while creating a new media expert:", error);
  }
};

export const getMediaExperts = async (): Promise<IMediaExpert[]> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID!,
      MEDIA_EXPERT_COLLECTION_ID!,
      []
    );
    return parseStringify(response.documents);
  } catch (error) {
    console.error("An error occurred while retrieving media experts:", error);
    return [];
  }
};