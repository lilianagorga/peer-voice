import Success from "../../../../components/commons/Success";


const PlatformPage = ({ params, searchParams }: { params: { userId: string; courseId: string }, searchParams: { mediaExpertId: string } }) => {
  return (
    <Success
    title="Platform Added Successfully"
    description="Platform has been successfully added."
    buttonText="Go to Dashboard"
    buttonLink={`/mediaExperts/${params.userId}/dashboard`}
  />
  );
};

export default PlatformPage;