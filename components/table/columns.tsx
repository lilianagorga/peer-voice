"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ICourse, Status } from "../../types/appwrite.types";
import { StatusBadge } from "../StatusBadge";
import { formatDateTime } from "../../lib/utils";

export const columns = (
  handleStatusChange: (courseId: string, newStatus: Status) => void
): ColumnDef<ICourse>[] => [
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="min-w-[115px] flex flex-col items-center">
          <StatusBadge status={course.status} />
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
  {
    id: "actions",
    header: () => <div className="pl-4">Actions</div>,
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="flex gap-1 justify-center">
          <button
            className="px-2 mr-2 py-1 bg-green-600 text-green-500 rounded-md"
            onClick={() => handleStatusChange(course.$id, Status.Scheduled)}
          >
            Schedule
          </button>
          <button
            className="px-2 mr-2 py-1 bg-blue-600 text-blue-500 rounded-md"
            onClick={() => handleStatusChange(course.$id, Status.Pending)}
          >
            Pending
          </button>
          <button
            className="px-2 py-1 bg-red-600 text-red-500 rounded-md"
            onClick={() => handleStatusChange(course.$id, Status.Cancelled)}
          >
            Cancel
          </button>
        </div>
      );
    },
  },
];