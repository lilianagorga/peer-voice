"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCourses, joinCourse } from "../lib/actions/course.actions";
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import Button from "./commons/Button";
import Image from "next/image";

const JoinCourse = ({ userId, onJoinCourse }: { userId: string, onJoinCourse: (courseId: string) => void }) => {
  const router = useRouter();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        console.log("Fetching courses...");
        const coursesList = await getCourses();
        console.log("Courses fetched:", coursesList);
        setCourses(coursesList);
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses. Please try again later.");
      }
    };
    fetchCourses();
  }, []);

  const handleJoinCourse = async () => {
    console.log("Selected Course:", selectedCourse);
    console.log("User ID:", userId);
    if (!selectedCourse) {
      alert("Please select a course first");
      return;
    }
    try {
      const result = await joinCourse(selectedCourse, userId);
      console.log("Join course result:", result);
      if (result?.message === "Already joined") {
        alert("You are already a participant in this course.");
      } else {
        onJoinCourse(selectedCourse);
        router.push(`/mediaExperts/${userId}/courses/${selectedCourse}/joinCourse`);
      }
    } catch (error) {
      console.error("Error joining course:", error);
    }
  };


  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex flex-row items-center justify-around h-36 w-96 rounded-lg shadow-md">
            <Image src="/assets/icons/magnifying-glass.svg" alt="Discover" width={64} height={64} />
            <span className="text-xl font-bold pb-2">Discover Our Courses</span>
          </Button>
        </DialogTrigger>
        <DialogOverlay />
        <DialogContent aria-describedby="join-course-description">
          <DialogHeader>
            <DialogTitle>Join a Course</DialogTitle>
            <DialogDescription id="join-course-description">
              Select a course from the list and click Join Course.
            </DialogDescription>
          </DialogHeader>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-4">
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Course</option>
              {courses.map((course) => (
                <option key={course.$id} value={course.$id}>
                  {course.title}
                </option>
              ))}
            </select>
            <Button onClick={handleJoinCourse} className="w-full">
              Join Course
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default JoinCourse;