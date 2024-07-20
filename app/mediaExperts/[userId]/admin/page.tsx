import JoinCourse from "../../../../components/JoinCourse";
import { StatCard } from "../../../../components/StatCard";
import { columns } from "../../../../components/table/columns";
import { DataTable } from "../../../../components/table/DataTable";
import { getRecentCourseList } from "../../../../lib/actions/course.actions";

const AdminPage = async ({ params: { userId } }: SearchParamProps) => {
  const coursesData = await getRecentCourseList();
  const courses = coursesData.documents;

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header mt-8">
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing your content and join new courses
          </p>
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
          <JoinCourse userId={userId} />
        </section>
        <section className="w-full space-y-4">
          <DataTable columns={columns} data={courses}  />
        </section>
      </main>
    </div>
  );
};

export default AdminPage;