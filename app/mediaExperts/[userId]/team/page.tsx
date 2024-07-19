import Course from "../../../../components/Course";
import Platform from "../../../../components/Platform";
import PublishContent from "../../../../components/PublishContent";

const TeamPage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  return (
    <div className="mx-auto flex max-w-7xl flex-col space-y-14">
      <header className="admin-header">
        <p className="text-16-semibold">Team Dashboard</p>
      </header>

      <main className="admin-main">
        <section className="w-full space-y-4">
          <p className="text-dark-700">
            Manage courses and platforms
          </p>
        </section>
        <section className="w-full space-y-4">
          <Course userId={userId} />
        </section>
        <section className="w-full space-y-4">
          <Platform userId={userId} />
        </section>
        <section className="w-full space-y-4">
          <PublishContent userId={userId} />
        </section>
      </main>
    </div>
  );
};

export default TeamPage;