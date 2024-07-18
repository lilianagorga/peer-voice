import Platform from '../../../../components/Platform';

const PlatformPage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  return (
    <Platform userId={userId} />
  );
}

export default PlatformPage;