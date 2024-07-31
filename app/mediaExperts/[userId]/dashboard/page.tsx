"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { columnsCourse } from "../../../../components/table/columnsCourse";
import { columnsPlatform } from "../../../../components/table/columnsPlatform";
import { columns } from "../../../../components/table/columns";
import { DataTable } from "../../../../components/table/DataTable";
import { getCourses, getCoursesForMediaExpert, joinCourse, updateJoinedCourseStatus } from "../../../../lib/actions/course.actions";
import { getMediaExperts } from "../../../../lib/actions/media_expert.actions";
import { getPlatforms } from "../../../../lib/actions/platform.actions";
import { ICourse, IPlatform, Status } from "../../../../types/appwrite.types";
import AddParticipant from "../../../../components/AddParticipant";
import Course from "../../../../components/Course";
import Platform from "../../../../components/Platform";
import PublishContent from "../../../../components/PublishContent";
import JoinCourse from "../../../../components/JoinCourse";
import { StatCard } from "../../../../components/StatCard";
import Success from "../../../../components/commons/Success";


const DashboardPage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const router = useRouter();
  const [joinCoursesData, setJoinCoursesData] = useState<ICourse[]>([]);
  const [coursesData, setCoursesData] = useState<ICourse[]>([]);
  const [mediaExperts, setMediaExperts] = useState<IMediaExpert[]>([]);
  const [platformsData, setPlatformsData] = useState<IPlatform[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courses, mediaExperts, platforms] = await Promise.all([
          getCourses(),
          getMediaExperts(),
          getPlatforms(),
        ]);
        setCoursesData(courses);
        setMediaExperts(mediaExperts);
        setPlatformsData(platforms);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCoursesForMediaExpert(userId);
        setJoinCoursesData(data);
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
      await updateJoinedCourseStatus(courseId, userId, newStatus);

      const updatedCourses = joinCoursesData.map(course => 
        course.$id === courseId ? { ...course, status: newStatus } : course
      );
      setJoinCoursesData(updatedCourses);
      router.push(`/mediaExperts/${userId}/courses/${courseId}/joinCourse/status`);
    } catch (error) {
      console.error("Error updating course status: ", error);
    }
  };

  const handleJoinCourse = async (courseId: string) => {
    try {
      setLoading(true);
      await joinCourse(courseId, userId);
      const updatedCourses = await getCoursesForMediaExpert(userId);
      setJoinCoursesData(updatedCourses);
    } catch (error) {
      console.error("Error during course join: ", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const courseCounts = joinCoursesData.reduce((acc: Record<string, number>, course: ICourse) => {
    acc[course.status] = (acc[course.status] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="dashboard-header mt-8">
        <p className="text-16-bold text-center">Dashboard</p>
      </header>
      <main className="dashboard-main">
        <section className="w-full flex flex-col md:flex-row justify-around md:space-x-4 space-y-4 md:space-y-0">
          <Course userId={userId} closeModal={() => {}} />
          <AddParticipant userId={userId} />
        </section>
        <section className="w-full space-y-4">
          <DataTable columns={columnsCourse} data={coursesData} />
        </section>
        <section className="w-full space-y-4">
          <JoinCourse userId={userId} onJoinCourse={handleJoinCourse} />
        </section>
        <section className="dashboard-stat">
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
          <DataTable columns={columns(handleStatusChange)} data={joinCoursesData} />
        </section>
        <section className="w-full flex flex-col md:flex-row justify-around md:space-x-4 space-y-4 md:space-y-0">
          <Platform userId={userId} closeModal={() => {}} />
          <PublishContent userId={userId} />
        </section>
        <section className="w-full space-y-4">
          <DataTable columns={columnsPlatform} data={platformsData} />
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;