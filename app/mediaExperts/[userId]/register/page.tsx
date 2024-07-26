import RegisterForm from '../../../../components/forms/RegisterForm'

import { getUser } from "../../../../lib/actions/media_expert.actions"

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  if (!user) {
    console.error('User not found');
    return <p>User not found</p>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <RegisterForm user={user} />
    </main>
  );
};
export default Register;