"use client";

import React from 'react';
import { ICourse } from '../types/appwrite.types';

const Course: React.FC<{ course: ICourse }> = ({ course }) => {
  const handleJoinCourse = () => {
    console.log(`Joining course: ${course.title}`);
  };

  return (
    <div className="card">
      <h2>{course.title}</h2>
      <p>Description: {course.description}</p>
      <p>Course Area: {course.course_area}</p>
      <p>Duration: {course.duration} weeks</p>
      <p>Participants: {course.media_expert?.length}</p>
      <button onClick={handleJoinCourse}>Join course</button>
    </div>
  );
};

export default Course;