"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IPlatform } from "../../types/appwrite.types";
import { formatDateTime } from "../../lib/utils";

export const columnsPlatform: ColumnDef<IPlatform, unknown>[] = [
  {
    header: "#",
    accessorFn: (row, i) => i + 1,
    id: "rowNumber",
    cell: ({ row }) => {
      return <p className="text-14-medium text-center">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: "name",
    header: "Platform Name",
    cell: ({ row }) => {
      const platform = row.original;
      return <p className="text-14-medium text-center">{platform.name}</p>;
    },
  },
  {
    accessorKey: "contentId",
    header: "Contents",
    cell: ({ row }) => {
      const platform = row.original;
      const contentCount = platform.contentId ? platform.contentId.split(',').length : 0;
      return (
        <div className="text-14-regular text-center">
          {contentCount}
        </div>
      );
    },
  },
  {
    accessorKey: "$createdAt",
    header: "Date",
    cell: ({ row }) => {
      const platform = row.original;
      return <p className="text-14-regular text-center">{formatDateTime(platform.$createdAt).dateOnly}</p>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const platform = row.original;
      const shortDescription = platform.description
        ? platform.description.split(" ").slice(0, 3).join(" ") + (platform.description.split(" ").length > 3 ? "..." : "")
        : "";
      return <p className="text-14-regular truncate text-center">{shortDescription}</p>;
    },
  },
];