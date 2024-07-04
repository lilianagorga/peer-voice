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
  ["Directing", "Editing", "Screenwriting"]
);

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Media Experts</h1>
      <div className="grid gap-8 lg:grid-cols-2 md:grid-cols-1">
        <MediaExpertComponent person={expert1} />
        <MediaExpertComponent person={expert2} />
      </div>
    </main>
  );
}