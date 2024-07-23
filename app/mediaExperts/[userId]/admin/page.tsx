"use client";

import { useEffect, useState } from "react";
import JoinCourse from "../../../../components/JoinCourse";
import { StatCard } from "../../../../components/StatCard";
import { columns } from "../../../../components/table/columns";
import { DataTable } from "../../../../components/table/DataTable";
import { getCoursesForMediaExpert, updateJoinedCourseStatus, joinCourse } from "../../../../lib/actions/course.actions";
import { Status } from "../../../../types/appwrite.types";

const AdminPage = ({ params: { userId } }: SearchParamProps) => {
  const [coursesData, setCoursesData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("Fetching courses...");
        const data = await getCoursesForMediaExpert(userId);
        console.log("Courses fetched:", data);
        setCoursesData(data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [userId]);

  const handleStatusChange = async (courseId: string, newStatus: Status) => {
    try {
      console.log(`handleStatusChange called with courseId: ${courseId}, newStatus: ${newStatus}`);
      await updateJoinedCourseStatus(courseId, userId, newStatus);
  
      const updatedCourses = coursesData.map(course => 
        course.$id === courseId ? { ...course, status: newStatus } : course
      );
      setCoursesData(updatedCourses);
    } catch (error) {
      console.error("Error updating course status: ", error);
    }
  };

  const handleJoinCourse = async (courseId: string) => {
    try {
      setLoading(true);
      console.log(`Joining course ${courseId} for user ${userId}`);
      await joinCourse(courseId, userId);
      console.log(`Course joined, fetching updated courses for user ${userId}`);
      const updatedCourses = await getCoursesForMediaExpert(userId);
      setCoursesData(updatedCourses);
      console.log(`Updated courses fetched: `, updatedCourses);
    } catch (error) {
      console.error("Error during course join: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const courseCounts = coursesData.reduce((acc: Record<string, number>, course: ICourse) => {
    acc[course.status] = (acc[course.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header mt-8">
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <JoinCourse userId={userId} onJoinCourse={handleJoinCourse} />
        </section>
        <section className="admin-stat">
          <StatCard
            type="scheduled"
            count={courseCounts.scheduled || 0}
            label="Scheduled courses"
            icon={"/assets/icons/scheduled.svg"}
          />
          <StatCard
            type="pending"
            count={courseCounts.pending || 0}
            label="Pending courses"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={courseCounts.cancelled || 0}
            label="Cancelled courses"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
        <section className="w-full space-y-4">
          <DataTable columns={columns(handleStatusChange)} data={coursesData} />
        </section>
      </main>
    </div>
  );
};

export default AdminPage;