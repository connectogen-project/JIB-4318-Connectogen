'use client'

import { useEffect, useState } from "react";
import { DataTable } from "./data-table"
import { SortOption } from "@/app/lib/components/MentorshipTable/sort-mentors";
import { User } from "@/app/lib/types";
import { Mentee, menteeColumns } from "./mentee-columns";


async function getMenteeData(sortOption: SortOption): Promise<Mentee[]> {
    // Fetch data from your API here.
    const allMenteeResponse = await fetch("http://localhost:2999/api/mentees/getMentees", {
        cache: "no-store",
    });

    if (!allMenteeResponse.ok) {
        throw new Error(`Failed to fetch mentor data: ${allMenteeResponse.statusText}`);
    }

    const allMenteeData: {
        data: User[],
    } = await allMenteeResponse.json();
    console.log(allMenteeData)

    let displayedData: Mentee[] = allMenteeData.data.map(user => ({
        name: user.firstName + " " + user.lastName,
        institution: user.institution,
        // fields: mentor.fields
        // position: mentor.position,
        subspecialties: user.subspecialties,
        createdAt: user.createdAt,
    }))


    displayedData = displayedData.sort((a, b) => {

        switch (sortOption) {
            case "nameAsc":
                return a.name.localeCompare(b.name);
            case "nameDesc":
                return b.name.localeCompare(a.name);
            case "dateAddedAsc":
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case "dateAddedDesc":
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default:
                return 0;
        }
    })
    return displayedData
}

export default function MenteeList({ sortOption }: { sortOption: SortOption }) {
    const [mentees, setMentees] = useState<Mentee[]>([]);

    useEffect(() => {
        async function fetchData() {
            const sortedMentees = await getMenteeData(sortOption);
            setMentees(sortedMentees);
        }
        fetchData();
    }, [sortOption]); // Only refetch when sorting changes

    return <DataTable columns={menteeColumns} data={mentees} />;
}
