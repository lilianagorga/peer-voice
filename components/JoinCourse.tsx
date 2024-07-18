"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCourses } from "../lib/actions/course.actions";

const JoinCourse = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesList = await getCourses();
      setCourses(coursesList);
    };
    fetchCourses();
  }, []);

  const handleJoinCourse = () => {
    if (!selectedCourse) {
      alert("Please select a course first");
      return;
    }
    router.push(`/mediaExperts/${userId}/courses/${selectedCourse}/joinCourse`);
  };

  return (
    <div>
      <h2>Join a Course</h2>
      <select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
      >
        <option value="">Select Course</option>
        {courses.map((course) => (
          <option key={course.$id} value={course.$id}>
            {course.title}
          </option>
        ))}
      </select>
      <button onClick={handleJoinCourse}>Join Course</button>
    </div>
  );
};

export default JoinCourse;