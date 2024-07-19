import Success from "../../../../../../components/Success";

const AddParticipantPage = ({ params, searchParams }: { params: { userId: string; courseId: string }, searchParams: { mediaExpertId: string } }) => {
  return (
    <Success
    title="Participant Added Successfully"
    description="Participant has been successfully added."
    buttonText="Go to Dashboard"
    buttonLink={`/mediaExperts/${params.userId}/team`}
  />
  );
};

export default AddParticipantPage;