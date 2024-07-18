import { joinTeam } from "../types/appwrite.types";

export const MediaExpertFormDefaultValues = {
  name: "",
  email: "",
  phone: "",
  interests: [],
  bio: "",
  specialization: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  joinTeam: joinTeam.No, 
}

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];
export const StatusIcon = {
  scheduled: "/assets/icons/check.svg",
  pending: "/assets/icons/pending.svg",
  cancelled: "/assets/icons/cancelled.svg",
};