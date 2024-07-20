"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ICourse } from "../../types/appwrite.types";
import { StatusBadge } from "../StatusBadge";

export const columns: ColumnDef<ICourse>[] = [
  {
    header: "#",
    accessorFn: (row, i) => i + 1,
    id: 'rowNumber',
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "title",
    header: "Course Title",
    cell: ({ row }) => {
      const course = row.original;
      return <p className="text-14-medium">{course.title}</p>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const course = row.original;
      return (
        <div className="min-w-[115px]">
          <StatusBadge status={course.status} />
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const course = row.original;
      return <p className="text-14-regular">{course.description}</p>;
    },
  },
];