import Success from "../../../../../../../components/commons/Success";

const StatusPage = ({ params }: { params: { userId: string, courseId: string } }) => {
  return (
    <Success
      title="Status Updated Successfully"
      description="The status of the course has been updated."
      buttonText="Go to Dashboard"
      buttonLink={`/mediaExperts/${params.userId}/dashboard`}
    />
  );
}

export default StatusPage;