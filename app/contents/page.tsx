"use client";
import React from 'react';
import Platform from '../../components/Platform';
import { PlatformClass } from '../../lib/PlatformClass';
import { MediaExpertClass } from '../../lib/MediaExpertClass';

const expert1 = new MediaExpertClass("Anna", "Rossi", "Journalism", 5, ["Writing", "Reporting", "Interviews"]);
const expert2 = new MediaExpertClass("Maria", "Bianchi", "Production", 3, ["Directing", "Editing", "Scriptwriting"]);

const platform1 = new PlatformClass("Journalism Platform", "Online", "Platform for publishing journalism content", ["Articles", "Reports", "Interviews"]);
const platform2 = new PlatformClass("Production Platform", "Online", "Platform for publishing production content", ["Videos", "Short Films", "Documentaries"]);

const publishContent = (platform: PlatformClass, expert: MediaExpertClass, content: string) => {
  platform.publishContent(expert, content);
  alert(`Content by ${expert.firstName} published on ${platform.name}`);
};

export default function Contents() {
  const platform1Data = {
    name: platform1.name,
    type: platform1.type,
    description: platform1.description,
    contentCategories: platform1.contentCategories,
  };

  const platform2Data = {
    name: platform2.name,
    type: platform2.type,
    description: platform2.description,
    contentCategories: platform2.contentCategories,
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-8">Published Contents</h1>
        <div className="grid gap-8 lg:grid-cols-2 md:grid-cols-1">
          <div>
            <Platform platform={platform1Data} />
            <button onClick={() => publishContent(platform1, expert1, "New Article")}>Publish Content</button>
          </div>
          <div>
            <Platform platform={platform2Data} />
            <button onClick={() => publishContent(platform2, expert2, "New Video")}>Publish Content</button>
          </div>
        </div>
      </main>
    </>
  );
}