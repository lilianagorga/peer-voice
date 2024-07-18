const AddParticipantPage = ({ params, searchParams }: { params: { userId: string; courseId: string }, searchParams: { mediaExpertId: string } }) => {
  return (
    <div>
      <h1>Add Participant</h1>
      <p>Course ID: {params.courseId}</p>
      <p>Media Expert ID: {searchParams.mediaExpertId}</p>
    </div>
  );
};

export default AddParticipantPage;