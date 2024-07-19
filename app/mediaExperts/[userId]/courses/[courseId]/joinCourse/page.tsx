import Success from "../../../../../../components/Success";

const JoinCoursePage = ({ params }: { params: { userId: string } }) => {
  return (
    <Success
      title="Course Joined Successfully"
      description="You have successfully joined the course."
      buttonText="Go to Dashboard"
      buttonLink={`/mediaExperts/${params.userId}/admin`}
    />
  );
  }

export default JoinCoursePage;