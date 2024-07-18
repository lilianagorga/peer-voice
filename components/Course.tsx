"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCourses } from "../lib/actions/course.actions";
import { getMediaExperts } from "../lib/actions/media_expert.actions";

const Course = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [mediaExperts, setMediaExperts] = useState<IMediaExpert[]>([]);
  const [selectedMediaExpert, setSelectedMediaExpert] = useState<string>("");

  useEffect(() => {
    const fetchCoursesAndMediaExperts = async () => {
      const coursesList = await getCourses();
      const mediaExpertsList = await getMediaExperts();
      setCourses(coursesList);
      setMediaExperts(mediaExpertsList);
    };
    fetchCoursesAndMediaExperts();
  }, []);

  const handleAddParticipant = (courseId: string) => {
    if (!selectedMediaExpert) {
      alert("Please select a media expert first");
      return;
    }
    router.push(`/mediaExperts/${userId}/courses/${courseId}/addParticipant?mediaExpertId=${selectedMediaExpert}`);
  };


  return (
    <div>
    <h1>Courses</h1>
    <ul>
        {courses.map((course) => (
          <li key={course.$id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <select
              value={selectedMediaExpert}
              onChange={(e) => setSelectedMediaExpert(e.target.value)}
            >
              <option value="">Select Media Expert</option>
              {mediaExperts.map((expert) => (
                <option key={expert.$id} value={expert.$id}>
                  {expert.name}
                </option>
              ))}
            </select>
            <button onClick={() => handleAddParticipant(course.$id)}>
              Add Participant
            </button>
          </li>
        ))}
      </ul>
  </div>
  );
};

export default Course;