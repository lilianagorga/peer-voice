"use server";

import { revalidatePath } from "next/cache";
import { ID, Query } from "node-appwrite";
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

export const getCourses = async (): Promise<ICourse[]> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID!,
      COURSE_COLLECTION_ID!,
      []
    );
    return parseStringify(response.documents);
  } catch (error) {
    console.error("An error occurred while retrieving courses:", error);
    return [];
  }
};

// export const updateCourse = async (courseId: string, updatedData: any): Promise<ICourse | null> => {
//   try {
//     const updatedCourse = await databases.updateDocument(
//       DATABASE_ID!,
//       COURSE_COLLECTION_ID!,
//       courseId,
//       updatedData
//     ) as unknown as ICourse;
//     return parseStringify(updatedCourse);
//   } catch (error) {
//     console.error("An error occurred while updating the course:", error);
//     return null;
//   }
// };

// export const deleteCourse = async (courseId: string): Promise<boolean> => {
//   try {
//     await databases.deleteDocument(
//       DATABASE_ID!,
//       COURSE_COLLECTION_ID!,
//       courseId
//     );
//     return true;
//   } catch (error) {
//     console.error("An error occurred while deleting the course:", error);
//     return false;
//   }
// };

export const getRecentCourseList = async () => {
  try {
    const courses = await databases.listDocuments(
      DATABASE_ID!,
      COURSE_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (courses.documents as ICourse[]).reduce(
      (acc, course) => {
        switch (course.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: courses.total,
      ...counts,
      documents: courses.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error("An error occurred while retrieving the recent courses:", error);
  }
};

export const updateCourse = async (courseId: string, updatedData: any): Promise<ICourse | null> => {
  try {
    const updatedCourse = await databases.updateDocument(
      DATABASE_ID!,
      COURSE_COLLECTION_ID!,
      courseId,
      updatedData
    );

    const courses = await databases.listDocuments(
      DATABASE_ID!,
      COURSE_COLLECTION_ID!,
      [Query.orderDesc("$createdAt")]
    );

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = (courses.documents as ICourse[]).reduce(
      (acc, course) => {
        switch (course.status) {
          case "scheduled":
            acc.scheduledCount++;
            break;
          case "pending":
            acc.pendingCount++;
            break;
          case "cancelled":
            acc.cancelledCount++;
            break;
        }
        return acc;
      },
      initialCounts
    );

    const data = {
      totalCount: courses.total,
      ...counts,
      documents: courses.documents,
    };

    return parseStringify(data);
  } catch (error) {
    console.error("An error occurred while updating the course:", error);
    return null;
  }
};