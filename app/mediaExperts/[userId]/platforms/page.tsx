import PublishContent from '../../../../components/PublishContent';

const PlatformPage = ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  return (
    <div className='m-20'>
      <PublishContent userId={userId} />
    </div>
  );
}

export default PlatformPage;