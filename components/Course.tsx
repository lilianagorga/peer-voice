"use client";

import React from 'react';

const Course: React.FC<{ course: { title: string, description: string, specializationField: string, duration: number, participants: { firstName: string, lastName: string }[] } }> = ({ course }) => {
  const handleJoincourse = () => {
    console.log(`Joining course: ${course.title}`);
  };

  return (
    <div className="card">
      <h2>{course.title}</h2>
      <p>Description: {course.description}</p>
      <p>Specialization Field: {course.specializationField}</p>
      <p>Duration: {course.duration} weeks</p>
      <p>Participants: {course.participants.length}</p>
      <button onClick={handleJoincourse}>Join course</button>
    </div>
  );
};

export default Course;