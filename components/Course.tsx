"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { Dialog, DialogTrigger, DialogOverlay, DialogHeader, DialogTitle, DialogDescription, DialogContent } from "./ui/dialog";
import { Form } from "./ui/form";
import { registerCourse } from "../lib/actions/course.actions";
import { Status } from "../types/appwrite.types";
import { CourseDefaultValues } from "../constants";
import { CourseRegisterSchema } from "../lib/validation";
import CustomFormField, { FormFieldType } from "./commons/CustomFormField";
import Button from "./commons/Button";
import SubmitButton from "./commons/SubmitButton";

interface CourseProps {
  userId: string;
  closeModal: () => void;
}

const Course: React.FC<CourseProps> = ({ userId, closeModal }) => {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasDescription, setHasDescription] = useState(false);
  const form = useForm<z.infer<typeof CourseRegisterSchema>>({
    defaultValues: CourseDefaultValues,
    resolver: zodResolver(CourseRegisterSchema),
  });

  const onSubmit = async (values: z.infer<typeof CourseRegisterSchema>) => {
    setIsLoading(true);
    const courseData = { ...values, userId, status: Status.Pending };

    try {
      const response = await registerCourse(courseData);
      closeModal();
      router.push(`/mediaExperts/${userId}/courses`);
    } catch (error) {
      console.error("Error registering course:", error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex justify-center">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button className="flex flex-row items-center justify-around h-36 w-96 rounded-lg shadow-md" onClick={() => console.log("Dialog Trigger Clicked")}>
            <Image src="/assets/icons/book.svg" alt="Discover" width={64} height={64} />
            <span className="text-xl font-bold pb-2">Add Course</span>
          </Button>
        </DialogTrigger>
        <DialogOverlay />
        <DialogContent aria-describedby={hasDescription ? "add-course-description" : undefined} className="custom-modal-width">
          <DialogHeader>
            <DialogTitle className="text-center header">Add a New Course</DialogTitle>
            <DialogDescription id="add-course-description" className="text-center">
              Fill in the details to add a new course.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-8">
              <section className="grid grid-cols-2 gap-4"> 
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="title"
                    label="Course Title"
                    placeholder="Course's Title"
                  />
                  <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="course_area"
                    label="Course Area"
                    placeholder="Course's Area"
                  />
                </section>
                <section className="flex justify-center">
                  <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="description"
                    label="Description"
                    placeholder="Enter a description"
                  />
                </section>
              <SubmitButton isLoading={isLoading}>Submit and Continue</SubmitButton>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Course;