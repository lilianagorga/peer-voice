"use server";

import { ID, InputFile } from "node-appwrite";
import { DATABASE_ID, PLATFORM_COLLECTION_ID, databases, storage, BUCKET_ID, ENDPOINT, PROJECT_ID } from "../appwrite.config";
import { IPlatform } from "../../types/appwrite.types";
import { parseStringify } from "../utils";

export const getPlatforms = async (): Promise<IPlatform[]> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID!,
      PLATFORM_COLLECTION_ID!,
      []
    );
    return parseStringify(response.documents);
  } catch (error) {
    console.error("An error occurred while retrieving platforms:", error);
    return [];
  }
};

export const updatePlatform = async (platformId: string, updatedData: any): Promise<IPlatform | null> => {
  try {
    const updatedPlatform = await databases.updateDocument(
      DATABASE_ID!,
      PLATFORM_COLLECTION_ID!,
      platformId,
      updatedData
    ) as unknown as IPlatform;
    return parseStringify(updatedPlatform);
  } catch (error) {
    console.error("An error occurred while updating the platform:", error);
    return null;
  }
};

export const registerPlatform = async ({
  content,
  ...platform
}: ICreatePlatformParams) => {
  try {
    let file;
    if (content) {
      const inputFile =
      content &&
        InputFile.fromBlob(
          content?.get("blobFile") as Blob,
          content?.get("fileName") as string
        );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const newPlatform = await databases.createDocument(
      DATABASE_ID!,
      PLATFORM_COLLECTION_ID!,
      ID.unique(),
      {
        contentId: file?.$id ? file.$id : null,
        contentUrl: file?.$id
          ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
          : null,
        ...platform,
      }
    );

    return parseStringify(newPlatform);
  } catch (error) {
    console.error("An error occurred while creating a new platform:", error);
  }
};

export const publishContent = async (platformId: string, mediaExpertId: string, content: FormData) => {
  try {
    let file;
    if (content) {
      const inputFile = InputFile.fromBlob(
        content.get("blobFile") as Blob,
        content.get("fileName") as string
      );

      file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    }

    const platform = await databases.getDocument<IPlatform>(
      DATABASE_ID!,
      PLATFORM_COLLECTION_ID!,
      platformId
    );

    let updatedContentId = platform.contentId ? platform.contentId : "";
    let updatedContentUrl = platform.contentUrl ? platform.contentUrl : "";

    if (file?.$id) {
      updatedContentId += `,${file.$id}`;
      updatedContentUrl += `,${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view?project=${PROJECT_ID}`;
    }

    const updatedPlatform = await databases.updateDocument<IPlatform>(
      DATABASE_ID!,
      PLATFORM_COLLECTION_ID!,
      platformId,
      {
        contentId: updatedContentId,
        contentUrl: updatedContentUrl,
        userId: mediaExpertId,
        description: platform.description || "",
      }
    );

    return parseStringify(updatedPlatform);
  } catch (error) {
    console.error("An error occurred while publishing content:", error);
    return null;
  }
};