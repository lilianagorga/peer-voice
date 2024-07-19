import JoinCourse from "../../../../components/JoinCourse";

const AdminPage = async ({ params: { userId } }: SearchParamProps) => {

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <p className="text-16-semibold">Admin Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">
            Start the day with managing your content and join new courses
          </p>
        </section>
        <section className="w-full space-y-4">
          <JoinCourse userId={userId} />
        </section>
      </main>
    </div>
  );
};

export default AdminPage;