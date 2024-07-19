import PublishContent from '../../../../components/PublishContent';

const PlatformPage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  return (
    <PublishContent userId={userId} />
  );
}

export default PlatformPage;