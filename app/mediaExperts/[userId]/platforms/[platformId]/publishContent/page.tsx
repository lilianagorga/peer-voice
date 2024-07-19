import Success from "../../../../../../components/Success";

const PublishContentPage = ({ params }: { params: { userId: string; platformId: string } }) => {
  return (
    <Success
      title="Content Published Successfully"
      description="Content has been successfully published."
      buttonText="Go to Dashboard"
      buttonLink={`/mediaExperts/${params.userId}/team`}
    />
  );
};

export default PublishContentPage;