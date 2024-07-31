import Success from "../../../../components/commons/Success";

const CoursesPage = ({ params, searchParams }: { params: { userId: string; courseId: string }, searchParams: { mediaExpertId: string } }) => {
  return (
    <Success
    title="Course Added Successfully"
    description="Course has been successfully added."
    buttonText="Go to Dashboard"
    buttonLink={`/mediaExperts/${params.userId}/dashboard`}
  />
  );
};

export default CoursesPage;