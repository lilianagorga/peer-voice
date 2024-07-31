import Success from "../../../../../../components/commons/Success";

const JoinCoursePage = ({ params }: { params: { userId: string } }) => {
  return (
    <Success
      title="Course Joined Successfully"
      description="You have successfully joined the course."
      buttonText="Go to Dashboard"
      buttonLink={`/mediaExperts/${params.userId}/dashboard`}
    />
  );
  }

export default JoinCoursePage;