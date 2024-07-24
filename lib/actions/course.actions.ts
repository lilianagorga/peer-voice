"use server";

import { ID, Query } from "node-appwrite";
import { DATABASE_ID, COURSE_COLLECTION_ID, databases, COURSE_PARTICIPANTS_COLLECTION_ID } from "../appwrite.config";
import { parseStringify } from "../utils";
import { CourseParticipants, Status, ICourse, IMediaExpert } from "../../types/appwrite.types";

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

export const updateCourse = async (courseId: string, mediaExpertId: string): Promise<ICourse | null> => {
  try {
    const course = await databases.getDocument<ICourse>(
      DATABASE_ID!,
      COURSE_COLLECTION_ID!,
      courseId
    );

    console.log("Current course data:", course);

    const updatedMediaExperts = course.media_expert ? [...course.media_expert, mediaExpertId] : [mediaExpertId];

    console.log("Updated media experts:", updatedMediaExperts);

    const updatedCourse = await databases.updateDocument<ICourse>(
      DATABASE_ID!,
      COURSE_COLLECTION_ID!,
      courseId,
      {
        media_expert: updatedMediaExperts,
      }
    );

    console.log("Course updated successfully");
    return updatedCourse;
  } catch (error) {
    console.error("Error updating course:", error);
    return null;
  }
};

export const joinCourse = async (courseId: string, mediaExpertId: string): Promise<any> => {
  try {
    const newParticipant = await databases.createDocument(
      DATABASE_ID!,
      COURSE_PARTICIPANTS_COLLECTION_ID!,
      ID.unique(),
      { courseId, mediaExpertId, status: Status.Scheduled }
    );
    return newParticipant;
  } catch (error) {
    console.error("Error joining course:", error);
    throw error;
  }
};

export const getCoursesForMediaExpert = async (mediaExpertId: string): Promise<ICourse[]> => {
  if (!mediaExpertId) {
    throw new Error("mediaExpertId is required");
  }

  try {
    const participantCourses = await databases.listDocuments<CourseParticipants>(
      DATABASE_ID!,
      COURSE_PARTICIPANTS_COLLECTION_ID!,
      [Query.equal("mediaExpertId", mediaExpertId)]
    );

    if (participantCourses.documents.length === 0) {
      return [];
    }

    const courseIds = participantCourses.documents.map(doc => doc.courseId);
    const courseStatuses = participantCourses.documents.reduce((acc, doc) => {
      acc[doc.courseId] = doc.status;
      return acc;
    }, {} as Record<string, Status>);

    const courses = await databases.listDocuments(
      DATABASE_ID!,
      COURSE_COLLECTION_ID!,
      [Query.equal("$id", courseIds)]
    );

    const coursesWithStatus = courses.documents.map(course => ({
      ...course,
      status: courseStatuses[course.$id] || Status.Scheduled
    }));

    return parseStringify(coursesWithStatus);
  } catch (error) {
    console.error("An error occurred while retrieving the courses for the media expert:", error);
    return [];
  }
};

export const updateJoinedCourseStatus = async (courseId: string, mediaExpertId: string, newStatus: Status) => {
  try {
    const participantCourses = await databases.listDocuments<CourseParticipants>(
      DATABASE_ID!,
      COURSE_PARTICIPANTS_COLLECTION_ID!,
      [Query.equal("courseId", courseId), Query.equal("mediaExpertId", mediaExpertId)]
    );

    if (participantCourses.documents.length === 0) {
      throw new Error("No participant record found");
    }

    const participantCourseId = participantCourses.documents[0].$id;

    const updatedParticipant = await databases.updateDocument(
      DATABASE_ID!,
      COURSE_PARTICIPANTS_COLLECTION_ID!,
      participantCourseId,
      { status: newStatus }
    );

    return updatedParticipant;
  } catch (error) {
    console.error("Error updating joined course status:", error);
    throw error;
  }
};