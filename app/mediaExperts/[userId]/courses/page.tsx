import Course from "../../../../components/Course";

const CoursesPage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;


  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Course Page</h1>
      <Course userId={userId} />
    </main>
  );
};

export default CoursesPage;