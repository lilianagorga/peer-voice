"use server";

import { ID } from "node-appwrite";
import { DATABASE_ID, COURSE_COLLECTION_ID, databases } from "../appwrite.config";
import { parseStringify } from "../utils";

export const createCourse = async (course: ICreateCourseParams, userId: string) => {
  try {
    const newCourse = await databases.createDocument(
      DATABASE_ID!,
      COURSE_COLLECTION_ID!,
      ID.unique(),
      { ...course, userId },
    );
    return parseStringify(newCourse);
  } catch (error) {
    console.error("An error occurred while creating course:", error);
  }
};

export const getCourse = async (courseId: string): Promise<ICourse | null> => {
  try {
    const course = await databases.getDocument(
      DATABASE_ID!,
      COURSE_COLLECTION_ID!,
      courseId
    ) as unknown as ICourse;
    return parseStringify(course);
  } catch (error) {
    console.error("An error occurred while retrieving the course:", error);
    return null;
  }
};

export const updateCourse = async (courseId: string, updatedData: any): Promise<ICourse | null> => {
  try {
    const updatedCourse = await databases.updateDocument(
      DATABASE_ID!,
      COURSE_COLLECTION_ID!,
      courseId,
      updatedData
    ) as unknown as ICourse;
    return parseStringify(updatedCourse);
  } catch (error) {
    console.error("An error occurred while updating the course:", error);
    return null;
  }
};

export const deleteCourse = async (courseId: string): Promise<boolean> => {
  try {
    await databases.deleteDocument(
      DATABASE_ID!,
      COURSE_COLLECTION_ID!,
      courseId
    );
    return true;
  } catch (error) {
    console.error("An error occurred while deleting the course:", error);
    return false;
  }
};