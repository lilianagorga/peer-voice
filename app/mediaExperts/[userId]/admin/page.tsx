"use client";

import { useEffect, useState } from "react";
import JoinCourse from "../../../../components/JoinCourse";
import { StatCard } from "../../../../components/StatCard";
import { columns } from "../../../../components/table/columns";
import { DataTable } from "../../../../components/table/DataTable";
import { getRecentCourseList, updateCourse } from "../../../../lib/actions/course.actions";

const AdminPage = ({ params: { userId } }: SearchParamProps) => {
  const [coursesData, setCoursesData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const data = await getRecentCourseList();
      setCoursesData(data);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  const handleStatusChange = async (courseId: string, newStatus: Status) => {
    setLoading(true);
    const data = await updateCourse(courseId, { status: newStatus });
    setCoursesData(data);
    setLoading(false);
  };

  const handleJoinCourse = async (courseId: string) => {
    setLoading(true);
    await updateCourse(courseId, { status: 'scheduled' });
    const data = await getRecentCourseList();
    setCoursesData(data);
    setLoading(false);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

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
            count={coursesData.scheduledCount}
            label="Scheduled courses"
            icon={"/assets/icons/scheduled.svg"}
          />
          <StatCard
            type="pending"
            count={coursesData.pendingCount}
            label="Pending courses"
            icon={"/assets/icons/pending.svg"}
          />
          <StatCard
            type="cancelled"
            count={coursesData.cancelledCount}
            label="Cancelled courses"
            icon={"/assets/icons/cancelled.svg"}
          />
        </section>
        <section className="w-full space-y-4">
          <DataTable columns={columns(handleStatusChange)} data={coursesData.documents} />
        </section>
        
      </main>
    </div>
  );
};

export default AdminPage;