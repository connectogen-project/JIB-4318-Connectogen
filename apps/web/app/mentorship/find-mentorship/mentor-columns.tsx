"use client"

import { ColumnDef } from "@tanstack/react-table";

export type Mentor = {
    name: string
    institution: string
    fields: string
    position: string
}

export const columns: ColumnDef<Mentor>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "institution",
        header: "Institution",
    },
    {
        accessorKey: "fields",
        header: "Fields",
    },
    {
        accessorKey: "position",
        header: "Position",
    },
]
