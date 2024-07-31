import Success from "../../../../../../components/commons/Success";

const PublishContentPage = ({ params }: { params: { userId: string; platformId: string } }) => {
  return (
    <Success
      title="Content Published Successfully"
      description="Content has been successfully published."
      buttonText="Go to Dashboard"
      buttonLink={`/mediaExperts/${params.userId}/dashboard`}
    />
  );
};

export default PublishContentPage;