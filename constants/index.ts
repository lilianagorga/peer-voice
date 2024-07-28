import { joinTeam, Type } from "../types/appwrite.types";

export const MediaExpertFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  interests: [],
  bio: "",
  specialization: "",
  identificationType: "ID Card",
  identificationDocument: [],
  joinTeam: joinTeam.No, 
}

export const IdentificationTypes = [
  "ID Card",
  "Passport",
];

export const PlatformDefaultValues = {
  name: "",
  description: "",
  type: Type.Print,
  contentType: "Social",
  content: [],
}

export const ContentTypes = [
  "Social",
  "Cultural",
  "Economic",
  "Political",
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};

export const CourseDefaultValues = {
  title: "",
  description: "",
  course_area: "",
};