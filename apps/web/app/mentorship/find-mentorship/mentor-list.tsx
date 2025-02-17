'use client'

import { useEffect, useState } from "react";
import { DataTable } from "./data-table"
import { SortOption } from "@/app/lib/components/sort-mentors";
import { Mentor, mentorColumns } from "./mentor-columns";
import { User } from "@/app/lib/types";

async function getMentorData(sortOption: SortOption): Promise<Mentor[]> {
    // Fetch data from your API here.

    const allMentorResponse = await fetch("http://localhost:2999/api/mentors/getMentors", {
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


type MentorListProps = {
    sortOption: SortOption;
    filters: {
        institutions: string[];
        fields: string[];
        positions: string[];
        subspecialties: string[];
    };
};

export default function MentorList({ sortOption, filters }: MentorListProps) {
    const [mentors, setMentors] = useState<Mentor[]>([]);

    useEffect(() => {
        async function fetchData() {
            const sortedMentors = await getMentorData(sortOption);
            setMentors(sortedMentors);
        }
        fetchData();
    }, [sortOption]);

    // Filter mentors based on selected filters
    const filteredMentors = mentors.filter((mentor) => {
        return (
            (filters.institutions.length === 0 || filters.institutions.includes(mentor.institution)) &&
            (filters.subspecialties.length === 0 || filters.subspecialties.includes(mentor.subspecialties))
        );
    });

    return <DataTable columns={mentorColumns} data={filteredMentors} />;
}
