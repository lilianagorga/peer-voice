"use client";

import { ColumnDef } from "@tanstack/react-table";
import { formatDateTime } from "../../lib/utils";
import { ICourse } from "../../types/appwrite.types";

export const columnsTeam: ColumnDef<ICourse, unknown>[] = [
  {
    header: "#",
    accessorFn: (row, i) => i + 1,
    id: "rowNumber",
    cell: ({ row }) => {
      return <p className="text-14-medium text-center">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Course Title",
    cell: ({ row }) => {
      const course = row.original;
      return <p className="text-14-medium text-center">{course.title}</p>;
    },
  },
  {
    accessorKey: "media_expert",
    header: "Participants",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="text-14-regular text-center">
          {course.media_expert ? course.media_expert.length : 0}
        </div>
      );
    },
  },
  {
    accessorKey: "$createdAt",
    header: "Date",
    cell: ({ row }) => {
      const course = row.original;
      return <p className="text-14-regular text-center">{formatDateTime(course.$createdAt).dateOnly}</p>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const course = row.original;
      const shortDescription = course.description.split(" ").slice(0, 3).join(" ") + (course.description.split(" ").length > 3 ? "..." : "");
      return <p className="text-14-regular truncate text-center">{shortDescription}</p>;
    },
  },
];