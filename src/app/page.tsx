"use client";
import MediaExpertComponent from "../components/MediaExpertComponent";
import { MediaExpert } from "../lib/MediaExpert";

const expert1 = new MediaExpert(
  "Anna",
  "Rossi",
  "Journalism",
  5,
  ["Writing", "Reporting", "Interviews"]
);

const expert2 = new MediaExpert(
  "Maria",
  "Bianchi",
  "Production",
  3,
  ["Directing", "Editing", "Scriptwriting"]
);

export default function Home() {
  const expert1Data = {
    firstName: expert1.firstName,
    lastName: expert1.lastName,
    specialization: expert1.specialization,
    experience: expert1.experience,
    interests: expert1.interests,
  };

  const expert2Data = {
    firstName: expert2.firstName,
    lastName: expert2.lastName,
    specialization: expert2.specialization,
    experience: expert2.experience,
    interests: expert2.interests,
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to the Media Experts Platform</h1>
        <p className="mb-8 text-center">This platform allows media experts to enroll in training programs and publish content promoting gender equality.</p>
        <div className="grid gap-8 lg:grid-cols-2 md:grid-cols-1">
          <MediaExpertComponent person={expert1Data} />
          <MediaExpertComponent person={expert2Data} />
        </div>
      </main>
    </>
  );
}