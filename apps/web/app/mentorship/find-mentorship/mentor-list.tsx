'use client'

import { useEffect, useState } from "react";
import { DataTable } from "./data-table"
import { SortOption } from "@/app/lib/components/sort-mentors";
import { Mentor, mentorColumns } from "./mentor-columns";
import { User } from "@/app/lib/types";

async function getMentorData(sortOption: SortOption): Promise<Mentor[]> {
    // Fetch data from your API here.

    const allMentorResponse = await fetch("http://localhost:2999/auth/mentors", {
        cache: "no-store",
    });

    if (!allMentorResponse.ok) {
        throw new Error(`Failed to fetch mentor data: ${allMentorResponse.statusText}`);
    }

    const allMentorData: {
        data: User[],
    } = await allMentorResponse.json();

    let displayedData: Mentor[] = allMentorData.data.map(user => ({
        name: user.firstName + " " + user.lastName,
        institution: user.institution,
        // fields: user.fields
        // position: user.position,
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


export default function MentorList({ sortOption }: { sortOption: SortOption }) {
    const [mentors, setMentors] = useState<Mentor[]>([]);

    useEffect(() => {
        async function fetchData() {
            const sortedMentors = await getMentorData(sortOption);
            setMentors(sortedMentors);
        }
        fetchData();
    }, [sortOption]); // Only refetch when sorting changes

    return <DataTable columns={mentorColumns} data={mentors} />;
}
