"use client";
import React from 'react';
import PlatformComponent from '../../components/PlatformComponent';
import { Platform } from '../../lib/Platform';
import { MediaExpert } from '../../lib/MediaExpert';

const expert1 = new MediaExpert("Anna", "Rossi", "Journalism", 5, ["Writing", "Reporting", "Interviews"]);
const expert2 = new MediaExpert("Maria", "Bianchi", "Production", 3, ["Directing", "Editing", "Scriptwriting"]);

const platform1 = new Platform("Journalism Platform", "Online", "Platform for publishing journalism content", ["Articles", "Reports", "Interviews"]);
const platform2 = new Platform("Production Platform", "Online", "Platform for publishing production content", ["Videos", "Short Films", "Documentaries"]);

const publishContent = (platform: Platform, expert: MediaExpert, content: string) => {
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
            <PlatformComponent platform={platform1Data} />
            <button onClick={() => publishContent(platform1, expert1, "New Article")}>Publish Content</button>
          </div>
          <div>
            <PlatformComponent platform={platform2Data} />
            <button onClick={() => publishContent(platform2, expert2, "New Video")}>Publish Content</button>
          </div>
        </div>
      </main>
    </>
  );
}