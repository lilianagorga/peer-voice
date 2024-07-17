import RegisterForm from '../../../../components/forms/RegisterForm'
import Image from "next/image";
import { redirect } from "next/navigation";

import { getMediaExpert, getUser } from "../../../../lib/actions/media_expert.actions"

const Register = async ({ params: { userId } }: SearchParamProps) => {
  const user = await getUser(userId);
  const media_expert = await getMediaExpert(userId);
  if (media_expert) redirect(`/mediaExperts/${userId}/joinCourse`);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Create Media Expert</h1>
      <RegisterForm user={user} />
    </main>
  )
}

export default Register;