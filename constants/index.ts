import { joinTeam, Type } from "../types/appwrite.types";

export const MediaExpertFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  interests: [],
  bio: "",
  specialization: "",
  identificationType: "ID Card",
  identificationNumber: "",
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
  content_categories: [],
  type: Type.Print,
  contentType: "test",
  contentNumber: "",
  content: [],
}

export const ContentTypes = [
  "test",
  "test1",
  "test2",
  "test3",
];

export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};