"use client";

import React from 'react';
import { IPlatform, IMediaExpert, ICourse, Status, joinTeam } from '../types/appwrite.types';

const Platform: React.FC<{ platform: IPlatform }> = ({ platform }) => {
  const handlePublishContent = () => {
    const person: IMediaExpert = {
      $id: "example-id",
      $collectionId: "collection-id",
      $databaseId: "database-id",
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString(),
      $permissions: [],
      name: "Example Name",
      email: "example@example.com",
      phone: "1234567890",
      bio: "Example bio",
      identificationDocument: undefined,
      userId: "user-id",
      specialization: "Example specialization",
      interests: ["interest1", "interest2"],
      course: [],
      joinTeam: joinTeam.No,
      joinCourse: (course: ICourse) => {
        console.log(`Joining course: ${course.title}`);
      },
    };

    const course: ICourse = {
      $id: "course-id",
      userId: "user-id",
      $collectionId: "collection-id",
      $databaseId: "database-id",
      $createdAt: new Date().toISOString(),
      $updatedAt: new Date().toISOString(),
      $permissions: [],
      title: "Example Course",
      description: "Course Description",
      status: Status.Pending,
      course_area: "Course Area",
      duration: 10,
      media_expert: [],
      addParticipant: (person: IMediaExpert) => {
        console.log(`${person.name} has been added to the course ${course.title}`);
      },
    };

    const content = "Content text";
    platform.publishContent(person, content);
    console.log(`Publishing content on: ${platform.name}`);
    person.joinCourse(course);
  };

  return (
    <div className="card">
      <h2>{platform.name}</h2>
      <p>Type: {platform.type}</p>
      <p>Description: {platform.description}</p>
      <p>Content Categories: {platform.content_categories.join(', ')}</p>
      <button onClick={handlePublishContent}>Publish Content</button>
    </div>
  );
};

export default Platform;