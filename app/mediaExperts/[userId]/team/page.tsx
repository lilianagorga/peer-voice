"use client";

import { useEffect, useState } from "react";
import { columnsTeam } from "../../../../components/table/columnsTeam";
import { DataTable } from "../../../../components/table/DataTable";
import { getCourses } from "../../../../lib/actions/course.actions";
import { getMediaExperts } from "../../../../lib/actions/media_expert.actions";
import { ICourse } from "../../../../types/appwrite.types";
import AddParticipant from "../../../../components/AddParticipant";
import Course from "../../../../components/Course";
import Platform from "../../../../components/Platform";
import PublishContent from "../../../../components/PublishContent";

const TeamPage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const [coursesData, setCoursesData] = useState<ICourse[]>([]);
  const [mediaExperts, setMediaExperts] = useState<IMediaExpert[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [courses, mediaExperts] = await Promise.all([
          getCourses(),
          getMediaExperts(),
        ]);
        setCoursesData(courses);
        setMediaExperts(mediaExperts);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="team-header mt-8">
        <p className="text-16-bold text-center">Team Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full flex flex-row justify-around space-x-4">
        <Course userId={userId} closeModal={() => {}} />
          <AddParticipant userId={userId} />
        </section>
        <section className="w-full space-y-4">
          <DataTable columns={columnsTeam} data={coursesData} />
        </section>
        <section className="w-full flex flex-row justify-around space-x-4">
          <Platform userId={userId} closeModal={() => {}} />
          <PublishContent userId={userId} />
        </section>
      </main>
    </div>
  );
};

export default TeamPage;