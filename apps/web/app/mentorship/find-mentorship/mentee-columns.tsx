"use client"

import { ColumnDef } from "@tanstack/react-table";

export type Mentee = {
    name: string
    institution: string
    // fields: string
    // position: string
    subspecialties: string
}

export const menteeColumns: ColumnDef<Mentee>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "institution",
        header: "Institution",
    },
    // {
    //     accessorKey: "fields",
    //     header: "Fields",
    // },
    // {
    //     accessorKey: "position",
    //     header: "Position",
    // },
    // {
    //     accessorKey: "subspecialty",
    //     header: "Subspecialty",
    // },
]
