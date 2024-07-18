import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
});

const MediaExpertBaseSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name must be at most 50 characters"),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), "Invalid phone number"),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  interests: z.array(z.string()).optional(),
  bio: z.string().optional(),
  specialization: z.string().optional(),
  userId: z.string().optional(),
});

const CourseBaseSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  status: z.enum(["pending", "scheduled", "cancelled"], { message: "Status is required" }),
  media_expert_id: z.string().min(1, { message: "Media expert ID is required" }),
  course_area: z.string().min(1, { message: "Course area is required" }),
  duration: z.number().min(1, { message: "Duration is required" }),
});

export const MediaExpertSchema = MediaExpertBaseSchema.extend({
  courses: z.array(CourseBaseSchema).optional(),
  joinTeam: z.enum(["yes", "no"]),
});

export const CourseSchema = CourseBaseSchema.extend({
  participants: z.array(MediaExpertBaseSchema).optional()
});

export const PlatformSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  type: z.enum(["print", "online", "audiovisual"], { message: "Type is required" }),
  description: z.string().optional(),
  content_categories: z.array(z.string()).min(1, { message: "At least one content category is required" }),
  content: z.custom<File[]>().optional(),
  contentType: z.string().optional(),
  contentNumber: z.string().optional(),
});
