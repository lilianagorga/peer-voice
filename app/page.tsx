"use client";

import { UserForm } from "../components/forms/UserForm";

const Home = ({ searchParams }: SearchParamProps) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to the Media Experts Platform</h1>
      <p className="mb-8 text-center">This platform allows media experts to enroll in courses and publish content promoting gender equality.</p>
      <UserForm />
    </main>
  );
}
export default Home;