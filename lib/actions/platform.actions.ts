"use server";

import { ID } from "node-appwrite";
import { DATABASE_ID, PLATFORM_COLLECTION_ID, databases } from "../appwrite.config";
import { IPlatform, IMediaExpert } from "../../types/appwrite.types";

export const createPlatform = async (platform: ICreatePlatformParams, userId: string) => {
  try {
    const newPlatform = await databases.createDocument(
      DATABASE_ID!,
      PLATFORM_COLLECTION_ID!,
      ID.unique(),
      { ...platform, userId },
    );
    return newPlatform;
  } catch (error) {
    console.error("An error occurred while creating platform:", error);
  }
};

export const getPlatform = async (platformId: string): Promise<IPlatform | null> => {
  try {
    const platform = await databases.getDocument(
      DATABASE_ID!,
      PLATFORM_COLLECTION_ID!,
      platformId
    ) as unknown as IPlatform;
    return platform;
  } catch (error) {
    console.error("An error occurred while retrieving the platform:", error);
    return null;
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
    return updatedPlatform;
  } catch (error) {
    console.error("An error occurred while updating the platform:", error);
    return null;
  }
};

export const deletePlatform = async (platformId: string): Promise<boolean> => {
  try {
    await databases.deleteDocument(
      DATABASE_ID!,
      PLATFORM_COLLECTION_ID!,
      platformId
    );
    return true;
  } catch (error) {
    console.error("An error occurred while deleting the platform:", error);
    return false;
  }
};