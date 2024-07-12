"use client";
import React from 'react';
import Course from "../../components/Course";
import { CourseClass } from "../../lib/CourseClass";
import { MediaExpertClass } from '../../lib/MediaExpertClass';

const expert1 = new MediaExpertClass("Anna", "Rossi", "Journalism", 5, ["Writing", "Reporting", "Interviews"]);
const expert2 = new MediaExpertClass("Maria", "Bianchi", "Production", 3, ["Directing", "Editing", "Scriptwriting"]);

const course1 = new CourseClass("Advanced Journalism", "In-depth journalism courses", "Journalism", 12);
const course2 = new CourseClass("Media Production", "Comprehensive production courses", "Production", 8);
const course3 = new CourseClass("Digital Marketing", "Master digital marketing techniques", "Marketing", 10);

const joinCourse = (course: CourseClass, expert: MediaExpertClass) => {
  course.addParticipant(expert);
  alert(`${expert.firstName} has joined the course ${course.title}`);
};

export default function Courses() {
  const course1Data = {
    title: course1.title,
    description: course1.description,
    specializationField: course1.specializationField,
    duration: course1.duration,
    participants: course1.participants.map((p) => ({
      firstName: p.firstName,
      lastName: p.lastName,
    })),
  };

  const course2Data = {
    title: course2.title,
    description: course2.description,
    specializationField: course2.specializationField,
    duration: course2.duration,
    participants: course2.participants.map((p) => ({
      firstName: p.firstName,
      lastName: p.lastName,
    })),
  };

  const course3Data = {
    title: course3.title,
    description: course3.description,
    specializationField: course3.specializationField,
    duration: course3.duration,
    participants: course3.participants.map((p) => ({
      firstName: p.firstName,
      lastName: p.lastName,
    })),
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center p-8">
        <h1 className="text-4xl font-bold mb-8">Courses</h1>
        <div className="grid gap-8 lg:grid-cols-2 md:grid-cols-1">
          <div>
            <Course course={course1Data} />
            <button onClick={() => joinCourse(course1, expert1)}>Join Course</button>
          </div>
        <div>
            <Course course={course2Data} />
            <button onClick={() => joinCourse(course2, expert2)}>Join Course</button>
          </div>
          <div>
            <Course course={course3Data} />
            <button onClick={() => joinCourse(course3, expert1)}>Join Course</button>
          </div>
        </div>
      </main>
    </>
  );
}