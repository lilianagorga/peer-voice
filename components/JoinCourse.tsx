"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCourses } from "../lib/actions/course.actions";
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import Button from "./Button";
import Image from "next/image";

const JoinCourse = ({ userId, onJoinCourse }: { userId: string, onJoinCourse: (courseId: string) => void }) => {
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
    onJoinCourse(selectedCourse);
    router.push(`/mediaExperts/${userId}/courses/${selectedCourse}/joinCourse`);
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join a Course</DialogTitle>
          </DialogHeader>
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