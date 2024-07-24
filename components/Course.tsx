"use client";

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getCourses, updateCourse } from "../lib/actions/course.actions";
import {
  Dialog,
  DialogTrigger,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import Button from "./Button";
import Image from "next/image";
import { getMediaExperts } from "../lib/actions/media_expert.actions";
import { ICourse } from "../types/appwrite.types";

interface CourseProps {
  userId: string;
}

const Course: React.FC<CourseProps> = ({ userId }) => {
  const router = useRouter();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [mediaExperts, setMediaExperts] = useState<IMediaExpert[]>([]);
  const [selectedMediaExpert, setSelectedMediaExpert] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");

  useEffect(() => {
    const fetchCoursesAndMediaExperts = async () => {
      const coursesList = await getCourses();
      const mediaExpertsList = await getMediaExperts();
      setCourses(coursesList);
      setMediaExperts(mediaExpertsList);
    };
    fetchCoursesAndMediaExperts();
  }, []);

  const handleAddParticipant = async (courseId: string) => {
    if (!selectedMediaExpert) {
      alert("Please select a media expert first");
      return;
    }
    console.log("Adding participant:", { userId, courseId, selectedMediaExpert });
    try {
      await updateCourse(courseId, selectedMediaExpert);
      const updatedCourses = await getCourses();
      console.log("Updated courses data:", updatedCourses);
      setCourses(updatedCourses);

      router.push(`/mediaExperts/${userId}/courses/${courseId}/addParticipant?mediaExpertId=${selectedMediaExpert}`);
    } catch (error) {
      console.error("Error adding participant:", error);
    }
  };

  return (
    <div className="flex justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="flex flex-row items-center justify-around h-36 w-96 rounded-lg shadow-md">
            <Image src="/assets/icons/magnifying-glass.svg" alt="Discover" width={64} height={64} />
            <span className="text-xl font-bold pb-2">Add Participant</span>
          </Button>
        </DialogTrigger>
        <DialogOverlay />
        <DialogContent aria-describedby="add-participant-description">
          <DialogHeader>
            <DialogTitle>Add Participant to Course</DialogTitle>
            <DialogDescription id="add-participant-description">
              Select a course and a media expert from the list and click Add Participant.
            </DialogDescription>
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
            <select
              value={selectedMediaExpert}
              onChange={(e) => setSelectedMediaExpert(e.target.value)}
              className="mb-4 p-2 border border-gray-300 rounded w-full"
            >
              <option value="">Select Media Expert</option>
              {mediaExperts.map((expert) => (
                <option key={expert.$id} value={expert.$id}>
                  {expert.name}
                </option>
              ))}
            </select>
            <Button onClick={() => handleAddParticipant(selectedCourse)} className="w-full">
              Add Participant
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Course;